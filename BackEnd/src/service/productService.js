import Product from "../models/Admin_models/Product.js";

const LIMIT_PER_PAGE = 12;

class ProductService {
  static async getPaginatedProducts(
    filters = {},
    page = 1,
    sortOption = { averageRating: -1 }
  ) {
    try {
      const validatedPage = Math.max(1, parseInt(page));
      const skip = (validatedPage - 1) * LIMIT_PER_PAGE;

      const aggregationPipeline = [
        { $match: filters },
        {
          $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "product",
            as: "reviews",
          },
        },
        {
          $addFields: {
            averageRating: {
              $ifNull: [{ $avg: "$reviews.rating" }, -1], // Replace null with -1 for consistent sorting
            },
          },
        },
        {
          $sort: sortOption,
        },
        {
          $facet: {
            paginatedResults: [
              { $skip: skip },
              { $limit: LIMIT_PER_PAGE },
              {
                $project: {
                  reviews: 0, // Hide reviews in response
                },
              },
            ],
            totalCount: [{ $count: "count" }],
          },
        },
      ];

      const result = await Product.aggregate(aggregationPipeline);
      const products = result[0].paginatedResults;
      const totalCount = result[0].totalCount[0]?.count || 0;
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
