import Product from "../../models/Admin_models/Product.js";

// @desc   Get single product by ID
// @route  GET /product/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc   Update product by ID
// @route  PUT /product/:id
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};

//delete
export const deleteProduct = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  };
