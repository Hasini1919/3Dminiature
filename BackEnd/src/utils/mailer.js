
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER, 
        pass: process.env.GMAIL_PASS, 
    },
});

const sendOrderConfirmationEmail = async (to, orderDetails) => {
    console.log(to);

    const mailOptions = {
        from: `"Tiny Treasure" <${process.env.GMAIL_USER}>`,
        to: to,
        subject: "Order Confirmation",
        text: `Thank you for your order!

Total Amount: ${orderDetails.amount}
Items: ${orderDetails.items.length}
Payment Method: ${orderDetails.paymentMethod}
Order Number: ${orderDetails.orderNumber}


We'll process your order soon.`,
        html:  `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #f9f9f9;">
          <h1 style="color: #cb1a2e; text-align: center;">🎉 Thank You for Your Order!</h1>
          
          <p style="font-size: 16px;">Hi there,</p>
          <p style="font-size: 16px;">We're thrilled to let you know that your order has been successfully received at <strong>Tiny Treasure</strong>! 🛍️</p>
          
          <h3 style="margin-top: 20px; color: #333;">🧾 Order Summary:</h3>
          <ul style="font-size: 16px; line-height: 1.6;">
            <li><strong>Total Amount:</strong> LKR ${orderDetails.amount}</li>
            <li><strong>Items:</strong> ${orderDetails.items.length}</li>
            <li><strong>Payment Method:</strong> ${orderDetails.paymentMethod}</li>
            <li><strong>Order Number:</strong> ${orderDetails.orderNumber}</li>
          
          </ul>
      
          <p style="margin-top: 20px; font-size: 16px;">Our team is now getting your items ready for delivery. 📦</p>
      
          <p style="font-size: 16px;">You will receive another update once your order is shipped.</p>
      
          <p style="font-size: 16px; margin-top: 30px;">Thank you for choosing <strong>Tiny Treasure</strong> – where every gift is made with love! ❤️</p>
      
          <hr style="margin-top: 30px; margin-bottom: 20px;" />
      
          <p style="font-size: 14px; color: #888;">If you have any questions, feel free to reply to this email or contact our support team.</p>
        </div>
      `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Order confirmation email sent!");
    } catch (error) {
        console.error("Failed to send email:", error.message);
        throw new Error("Failed to send email");
    }
};

export { sendOrderConfirmationEmail };

