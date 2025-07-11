import Products from "../models/productModel.js";
const LIMIT_PER_PAGE = 6;

class ProductService {
  static async getPaginatedProducts(
    filters = {},
    page = 1,
    sortOption = { rating: -1 }
  ) {
    try {
      const validatedPage = Math.max(1, parseInt(page));
      const skip = (validatedPage - 1) * LIMIT_PER_PAGE;

      const [products, totalCount] = await Promise.all([
        Products.find(filters)
          .sort(sortOption)
          .skip(skip)
          .limit(LIMIT_PER_PAGE)
          .lean(),
        Products.countDocuments(filters),
      ]);

      const totalPages = Math.ceil(totalCount / LIMIT_PER_PAGE);
      const showingStart = totalCount === 0 ? 0 : skip + 1;
      const showingEnd = Math.min(skip + products.length, totalCount);

      return {
        products,
        pagination: {
          totalProducts: totalCount,
          totalPages,
          currentPage: validatedPage,
          showingStart,
          showingEnd,
          hasNextPage: validatedPage < totalPages,
        },
      };
    } catch (error) {
      console.error("ProductService error:", error);
      throw error;
    }
  }
}

export default ProductService;
