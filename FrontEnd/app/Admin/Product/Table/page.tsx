'use client';

import { useEffect, useState } from 'react';
import Slidebar from '@/components/Admin_sidebar/Slidebar';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
}


const ProductTable = () => {
  
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

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(fetchProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex pt-20 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 fixed top-20 left-0 h-full z-10">
        <Slidebar />
      </div>

    <div className="min-h-screen py-10 px-4 md:px-16 ml-60">

      <h2 className="text-4xl font-bold p-12 text-emerald-800 mb-10 text-center underline underline-offset-8">
        Product List
      </h2>

      <div className="overflow-x-auto rounded-3xl shadow-2xl ">
        <table className="min-w-[700px] w-full text-sm table-fixed bg-white">

          <thead className="bg-emerald-800 text-white text-md">
            <tr>
              <th className="py-4 px-8 text-left font-semibold uppercase w-1/4">Name</th>
              <th className="py-4 px-8 text-left font-semibold uppercase w-1/5">Price</th>
              <th className="py-4 px-8 text-left font-semibold uppercase w-1/4">Category</th>
              <th className="py-4 px-8 text-center font-semibold uppercase w-1/5">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-400 font-medium">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className=" hover:bg-emerald-600 transition duration-300"
                >
                  <td className="py-4 px-8 truncate text-black">{product.name}</td>
                  <td className="py-4 px-8 text-black font-bold">${product.price}</td>
                  <td className="py-4 px-8 text-black">{product.category}</td>
                  <td className="py-4 px-8 text-center ">
                    <button className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-5 py-2 rounded-full transition shadow-md hover:shadow-lg">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
   </div>
  );
};

export default ProductTable;