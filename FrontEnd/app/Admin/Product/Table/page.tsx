//// i use here


'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import Slidebar from '@/components/Admin_sidebar/Slidebar';
import Link from "next/link";
import { FiArrowRightCircle } from "react-icons/fi";

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
  const [catfilter, setcatFilter] = useState<string>('all');

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
    fetchProducts(); // fetch when page loads

    const onFocus = () => {
      fetchProducts(); // fetch when user focuses tab
    };

    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
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

    const matchesCategory = catfilter === 'all' || product.category === catfilter;

    return matchesFilter && matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="fixed top-0 left-0 w-64 h-full z-10">
        <Slidebar />
      </aside>

      <main className="ml-64 flex-grow px-8 py-20">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Product Management</h1>
              <p className="text-slate-600">Manage your product inventory and advertisements</p>
            </div>
            <Link
              href="/Admin/cop"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm"
            >
              Go to Coupon Table
              <FiArrowRightCircle className="text-lg" />
            </Link>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Search Products</label>
              <input
                type="text"
                placeholder="Search by product name..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Filter by Ad Status</label>
              <select
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'hasAd' | 'noAd')}
              >
                <option value="all">All Products</option>
                <option value="hasAd">With Advertisement</option>
                <option value="noAd">Without Advertisement</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Filter by Category</label>
              <select
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                value={catfilter}
                onChange={(e) => setcatFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="Wedding">Wedding</option>
                <option value="Baby">Baby</option>
                <option value="Graduation">Graduation</option>
                <option value="Family">Family</option>
                <option value="Birthday">Birthday</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Products Overview</h2>
            <p className="text-slate-600 mt-1">Total products found: {filteredProducts.length}</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Category
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Actions
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Advertisement
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wide">
                    Ad Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293L19 15m1-2h-2.586a1 1 0 01-.707-.293L15 11m4 2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5"></path>
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-slate-700 mb-1">No products found</h3>
                        <p className="text-slate-500">No products match your current search and filter criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, i) => (
                    <tr key={product._id} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 truncate max-w-xs">
                          {product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-semibold text-green-600">
                          Rs. {product.price.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => router.push(`/Admin/edit/${product._id}`)}
                            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm"
                          >
                            <PencilIcon />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm"
                          >
                            <TrashIcon />
                            Delete
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => router.push(`/Admin/advertisment/${product._id}`)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm"
                        >
                          Set Ad
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          adMap[product._id] 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {adMap[product._id] ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductTable;