import ProductService from "../service/productService.js";
import Advertisement from "../models/Advertisement.js";
import Product from "../models/Admin_models/Product.js";
export const getProducts = async (req, res) => {
  const {
    search,
    priceRange,
    frameColor,
    themeColor,
    category,
    rating,
    name,
    frameSize,
    sortBy = "rating",
    page = 1,
    limit = 6,
  } = req.query;

  try {
    const filters = {};

    // SEARCH FUNCTIONALITY (across multiple fields)
    if (search) {
      const searchFields = [
        "name",
        "description",
        "category",
        "frameColor",
        "themeColor",
        "frameSize",
      ];

      filters.$or = searchFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      }));

      // Include numeric search if search term is a number
      if (!isNaN(search)) {
        filters.$or.push(
          { price: parseFloat(search) },
          { rating: parseFloat(search) }
        );
      }
    }

    // PRICE RANGE FILTER
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split(",").map(Number);
      filters.price = {};
      if (!isNaN(minPrice)) filters.price.$gte = minPrice;
      if (!isNaN(maxPrice)) filters.price.$lte = maxPrice;
    }

    // ARRAY FILTERS (frameColor, themeColor, frameSize)
    const arrayFilters = { frameColor, themeColor, frameSize };
    Object.entries(arrayFilters).forEach(([key, value]) => {
      if (value) {
        // Handle both comma-separated strings and arrays
        const valuesArray =
          typeof value === "string" ? value.split(",") : value;
        filters[key] = { $in: valuesArray };
      }
    });

    // // SINGLE VALUE FILTERS
    if (category) filters.category = category;
    if (rating) {
      const parsedRating = parseFloat(rating);
      if (!isNaN(parsedRating)) filters.rating = { $gte: parsedRating };
    }
    if (name) filters.name = { $regex: name, $options: "i" };

    // Sorting logic
    let sortOption = {};

    if (sortBy === "rating") {
      sortOption = { averageRating: -1 };
    } else if (sortBy === "desc") {
      sortOption = { price: -1 };
    } else if (sortBy === "asc") {
      sortOption = { price: 1 };
    } else {
      sortOption = { _id: -1 };
    }
    
    // Execute query with pagination
    const { products, pagination } = await ProductService.getPaginatedProducts(
      filters,
      page,
      sortOption,
      limit
    );

    res.status(200).json({
      success: true,
      products,
      pagination,
      message:
        products.length === 0
          ? "No products match your filters"
          : "Products fetched successfully",
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

export const getProductWithAd = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const ad = await Advertisement.findOne({ productId });

    let discount = product.discount || 0;
    if (ad && ad.discountPercentage) {
      discount = ad.discountPercentage;
    }

    const discountedPrice = Math.round(product.price - (product.price * discount / 100));

    res.json({
      ...product.toObject(),
      discount,
      discountedPrice,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};