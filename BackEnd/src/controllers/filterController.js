import ProductService from "../service/productService.js";

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
    if (sortBy === "asc") sortOption.price = 1;
    else if (sortBy === "desc") sortOption.price = -1;
    else sortOption.rating = -1;

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
// Note: The ProductService.getPaginatedProducts method should handle pagination logic
// and return the products along with pagination details like total count, current page, etc.