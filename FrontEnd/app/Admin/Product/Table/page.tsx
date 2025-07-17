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

// Simple inline SVG icons for Edit and Delete buttons
const PencilIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M4 20h4.768l9.19-9.192-4.768-4.768L4 20z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7L5 7M10 11v6m4-6v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12" />
  </svg>
);

const ProductTable = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5500/form', { cache: 'no-store' });
      const data = await res.json();
      setProducts(data);
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
        fetchProducts(); // Refresh the product list
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen pt-20 bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-20 left-0 w-64 h-full z-10">
        <Slidebar />
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-grow p-8 max-w-7xl w-full">
        <h2 className="text-4xl font-extrabold text-emerald-900 mb-14 text-center tracking-wide underline underline-offset-12 decoration-emerald-500">
          Product List
        </h2>

        <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-gray-200">
          <table className="min-w-[750px] w-full text-sm border-collapse">
            <thead className="bg-emerald-800 text-white text-base font-semibold select-none">
              <tr>
                <th className="py-5 px-6 text-left w-1/6">Product ID</th>
                <th className="py-5 px-10 text-left w-2/5">Product Name</th>
                <th className="py-5 px-8 text-left w-1/6">Price</th>
                <th className="py-5 px-8 text-left w-1/4">Category</th>
                <th className="py-5 px-8 text-center w-1/6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-gray-400 font-semibold tracking-wide">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product, i) => (
                  <tr
                    key={product._id}
                    className={`transition-colors duration-300 cursor-default ${
                      i % 2 === 0 ? "bg-emerald-50" : "bg-white"
                    } hover:bg-emerald-100`}
                  >
                    <td className="py-5 px-6 font-mono text-xs text-emerald-700 truncate">{product._id}</td>
                    <td className="py-5 px-10 font-medium text-emerald-900 truncate">{product.name}</td>
                    <td className="py-5 px-8 text-emerald-800 font-semibold">${product.price.toFixed(2)}</td>
                    <td className="py-5 px-8 text-emerald-800">{product.category}</td>
                    <td className="py-5 px-8 text-center space-x-4">
                      <button
                        onClick={() => router.push(`/Admin/edit/${product._id}`)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center space-x-2 px-5 py-2 rounded-full shadow-lg transition duration-300"
                      >
                        <PencilIcon />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold flex items-center justify-center space-x-2 px-5 py-2 rounded-full shadow-lg transition duration-300"
                      >
                        <TrashIcon />
                        <span>Delete</span>
                      </button>
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
