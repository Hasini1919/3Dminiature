import Product from "../models/Admin_models/Product.js";
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        // console.log(products); 
        res.status(200).json(products); 
    } catch (error) {
        res.status(500).json({
            message: "Error fetching data from the database",
            error
        });
    }
};

export  default  getProducts;
