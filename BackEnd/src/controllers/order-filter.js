import OrderModel  from "../models/Order.js";

const orderFilter = async (req, res) => {
  const userId = req.userId;
  const { from, to, status } = req.query;

  console.log("From:", from);
  console.log("To:", to);
  console.log("Status:", status);
  

  const filter = { userId };

 
  if (from && to) {
    const fromTimestamp = new Date(from).getTime();
    const toTimestamp = new Date(to).getTime() + 86400000 - 1;

    filter.date = {
      $gte: fromTimestamp,
      $lte: toTimestamp,
    };
  }


  if (status) {
    if (Array.isArray(status)) {
      filter.status = { $in: status }; 
    } else {
      filter.status = status; 
    }
  }

  try {
    const orders = await OrderModel.find(filter).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Order Filter Error:", error);
    res.status(500).json({ error: "Failed to filter orders" });
  }
};

export { orderFilter };
