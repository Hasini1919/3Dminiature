import fs from 'fs';
import pdf from 'pdf-creator-node';
import path from 'path';
import { fileURLToPath } from 'url';
import { options } from '../utils/pdfoption.js';
import Order from '../models/Order.js';

// Needed because __dirname is not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const homeview = (req, res) => {
  res.render('home');
};

export const generatePdf = async (req, res) => {
  try {
    const html = fs.readFileSync(path.join(__dirname, '../utils/template.html'), 'utf-8');
    const filename = `${Date.now()}_Order_Report.pdf`;

    const orders = await Order.find();

    // Group orders by userId only
    let groupedOrders = {};

    orders.forEach(order => {
      const userId = order.userId.toLowerCase().trim();

      if (!groupedOrders[userId]) {
        groupedOrders[userId] = {
          userId: order.userId,
          addressList: [],
          orders: []
        };
      }

      // Collect unique addresses
      const existingAddress = groupedOrders[userId].addressList.find(
        addr => JSON.stringify(addr) === JSON.stringify(order.address)
      );

      if (!existingAddress) {
        groupedOrders[userId].addressList.push(order.address);
      }

      groupedOrders[userId].orders.push({
        items: order.items,
        amount: order.amount,
        date: new Date(order.date).toLocaleDateString(),
        orderNumber: order.orderNumber,
        status: order.status,
        paymentMethod: order.paymentMethod,
        shippingOption: order.selectedShippingOption
      });
    });

    // Convert to array and calculate subtotal per user
    const combinedData = Object.values(groupedOrders).map(user => {
      const subtotal = user.orders.reduce((sum, o) => sum + o.amount, 0);
      return {
        ...user,
        subtotal
      };
    });

    // Total subtotal from all users
    const totalSubtotal = combinedData.reduce((sum, u) => sum + u.subtotal, 0);
    const tax = totalSubtotal * 0.05;
    const grandtotal = totalSubtotal + tax;

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    });

    const invoiceNo = `DX-${Math.floor(1000 + Math.random() * 9000)}`;

    const docsFolder = path.join(__dirname, '../docs');
    if (!fs.existsSync(docsFolder)) {
      fs.mkdirSync(docsFolder, { recursive: true });
    }

    const document = {
      html,
      data: {
        prodlist: combinedData,
        subtotal: totalSubtotal,
        tax,
        gtotal: grandtotal,
        date: currentDate,
        invoiceNo
      },
      path: path.join(docsFolder, filename)
    };

    await pdf.create(document, options);

    res.json({ success: true, filepath: filename });
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ success: false, message: 'Error generating PDF' });
  }
};

export const downloadPdf = (req, res) => {
  const filename = req.query.file;
  if (!filename) {
    return res.status(400).json({ success: false, message: 'No file specified' });
  }

  const filepath = path.resolve(__dirname, '../docs', filename);

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ success: false, message: 'File not found' });
  }

  res.download(filepath);
};
