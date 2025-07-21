'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Slidebar from '@/components/Admin_sidebar/Slidebar';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
}

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M4 20h4.768l9.19-9.192-4.768-4.768L4 20z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7L5 7M10 11v6m4-6v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12" />
  </svg>
);

const ProductTable = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [adMap, setAdMap] = useState<Record<string, boolean>>({});

  // New states for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'hasAd' | 'noAd'>('all');

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5500/form', { cache: 'no-store' });
      const data = await res.json();
      setProducts(data);

      // Fetch ad status for all products
      const adStatuses: Record<string, boolean> = {};
      for (const product of data) {
        try {
          const adRes = await fetch(`http://localhost:5500/api/ads/${product._id}`);
          adStatuses[product._id] = adRes.ok;
        } catch (err) {
          adStatuses[product._id] = false;
        }
      }
      setAdMap(adStatuses);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5500/product/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert("Product deleted successfully!");
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 10000);
    return () => clearInterval(interval);
  }, []);

  // Filter and search products before rendering
  const filteredProducts = products.filter((product) => {
    const hasAd = adMap[product._id] || false;

    const matchesFilter =
      filter === 'all' ||
      (filter === 'hasAd' && hasAd) ||
      (filter === 'noAd' && !hasAd);

    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-screen pt-20 bg-gray-50">
      <aside className="fixed top-20 left-0 w-64 h-full z-10">
        <Slidebar />
      </aside>

      <main className="ml-64 flex-grow p-10 max-w-7xl w-full">
        <h2 className="text-4xl font-extrabold text-emerald-900 mb-10 text-center underline underline-offset-8 decoration-emerald-500">
          Product List
        </h2>

        {/* Search and Filter UI */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search by product name"
            className="border px-4 py-2 rounded-md shadow-sm w-full sm:w-1/3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="border px-4 py-2 rounded-md shadow-sm w-full sm:w-1/4"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'hasAd' | 'noAd')}
          >
            <option value="all">All Products</option>
            <option value="hasAd">With Ad</option>
            <option value="noAd">Without Ad</option>
          </select>
        </div>

        <div className="overflow-x-auto bg-white shadow-xl border border-gray-200">
          <table className="w-full text-sm border-separate border-spacing-0">
            <thead className="bg-emerald-800 text-white text-base font-semibold">
              <tr>
                <th className="py-3 px-3 text-left">Product Name</th>
                <th className="py-3 px-3 text-left">Price</th>
                <th className="py-3 px-3 text-left">Category</th>
                <th className="py-3 px-3 text-center">Actions</th>
                <th className="py-3 px-3 text-center">Ad</th>
                <th className="py-3 px-3 text-center">Ad Count</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400 font-semibold tracking-wide">
                    No products match your search/filter.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product, i) => (
                  <tr
                    key={product._id}
                    className={`transition-colors duration-300 ${
                      i % 2 === 0 ? "bg-emerald-50" : "bg-white"
                    } hover:bg-emerald-100`}
                  >
                    <td className="py-3 px-3 text-emerald-900 font-medium truncate">{product.name}</td>
                    <td className="py-3 px-3 text-emerald-800 font-semibold">Rs.{product.price.toFixed(2)}</td>
                    <td className="py-3 px-3 text-emerald-800">{product.category}</td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => router.push(`/Admin/edit/${product._id}`)}
                          className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-full shadow"
                        >
                          <PencilIcon />
                          <span className="ml-1 text-sm">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow"
                        >
                          <TrashIcon />
                          <span className="ml-1 text-sm">Delete</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => router.push(`/Admin/advertisment/${product._id}`)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1.5 rounded-full shadow-md text-sm font-semibold"
                      >
                        Set Ad
                      </button>
                    </td>
                    <td className="py-4 px-4 text-center font-semibold text-emerald-700">
                      {adMap[product._id] ? "1" : "0"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ProductTable;
