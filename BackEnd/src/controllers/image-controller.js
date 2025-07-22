// controllers/productController.js
import Products from '../models/Admin_models/Product.js';

const getAllImages = async (req, res) => {
  try {
    const products = await Products.find({})
       // newest first
      .limit(4)
      .select('images'); // only get images field

    // Flatten the images from all 5 products into a single array
    const images = products.flatMap(product => product.images);
    console.log("provide images");
   console.log(images);
    res.status(200).json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Server error fetching images' });
  }
};
export default getAllImages;