import ProductService from "../service/productService.js";

export const getProducts = async (req, res) => {
  const LIMIT_PER_PAGE = 6;

  try {
    // Extract all possible query parameters
    const {
      page = 1,
      sortBy = "rating",
      priceRange,
      frameColor,
      themeColor,
      category,
      rating,
      name,
      frameSize,
    } = req.query;

    // Build filters object
    const filters = {};

    // Price Range
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split(",").map(Number);
      if (!isNaN(minPrice))
        filters.price = { ...filters.price, $gte: minPrice };
      if (!isNaN(maxPrice))
        filters.price = { ...filters.price, $lte: maxPrice };
    }

    // Exact match filters (case insensitive)
    const exactMatchFields = {
      frameColor,
      themeColor,
      category,
      frameSize,
    };

    Object.entries(exactMatchFields).forEach(([field, value]) => {
      if (value) {
        const valuesArray =
          typeof value === "string" ? value.split(",") : value;
        filters[field] = {
          $in: valuesArray.map((val) => new RegExp(`^${val}$`, "i")),
        };
      }
    });
    

    // Rating filter
    if (rating) {
      const parsedRating = parseFloat(rating);
      if (!isNaN(parsedRating)) filters.rating = { $gte: parsedRating };
    }

    // Name search (partial match)
    if (name) filters.name = { $regex: new RegExp(name, "i") };

    // Sorting options
    const sortOption = {};
    if (req.query.sortBy === "asc") {
      sortOption.price = 1; 
    } else if (req.query.sortBy === "desc") {
      sortOption.price = -1; 
    } else {
      sortOption.rating = -1; 
    }

    // Get paginated results
    const { products, pagination } = await ProductService.getPaginatedProducts(
      filters,
      parseInt(page),
      sortOption,
      LIMIT_PER_PAGE
    );

    return res.json({
      success: true,
      products,
      pagination,
      message:
        products.length === 0
          ? "No products match your filters"
          : "Products fetched successfully",
    });
  } catch (error) {
    console.error("Product Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

