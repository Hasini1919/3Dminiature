//// i use here

"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { addProduct } from "@/utils/Admin/api";
import Navbar from "@/components/Admin_sidebar/Slidebar";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  frameSize: string[];
  frameColor: string[];
  themeColor: string[];
  images: string[];
  description: string;
  detailed_description: string;
};

const categories = ["Wedding", "Birthday", "Baby", "Graduation", "Family"];

const colorOptionsByCategory: {
  [key: string]: {
    frameColors: string[];
    themeColors: string[];
  };
} = {
  Wedding: { frameColors: ["Red", "Gold", "Brown"], themeColors: ["Pink", "Gold", "White"] },
  Birthday: { frameColors: ["Blue", "Yellow", "Purple"], themeColors: ["Orange", "Pink", "Sky"] },
  Baby: { frameColors: ["White", "Sky Blue"], themeColors: ["Pink", "Sky Blue", "Yellow"] },
  Graduation: { frameColors: ["Black", "Silver"], themeColors: ["Blue", "Silver", "Green"] },
  Family: { frameColors: ["Brown", "Beige"], themeColors: ["Green", "Gray", "Blue"] },
};

const ProductForm = ({
  formData,
  setFormData,
  handleSubmit,
}: {
  formData: any;
  setFormData: any;
  handleSubmit: (e: FormEvent) => void;
}) => {
  const selectedCategory = formData.category;
  const availableFrameColors = colorOptionsByCategory[selectedCategory]?.frameColors || [];
  const availableThemeColors = colorOptionsByCategory[selectedCategory]?.themeColors || [];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (name === "category") {
      setFormData((prev: any) => ({
        ...prev,
        category: value,
        frameColor: [],
        themeColor: [],
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleArrayChange = (field: string, value: string) => {
    setFormData((prev: any) => {
      const updated = prev[field].includes(value)
        ? prev[field].filter((v: string) => v !== value)
        : [...prev[field], value];
      return { ...prev, [field]: updated };
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev: any) => ({
        ...prev,
        images: [...prev.images, ...filesArray],
      }));
    }
  };

  const deleteImage = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index),
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-green-800 px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Add New Product</h2>
        </div>
        <p className="text-blue-100 mt-2">Fill in the details below to add a new product to your inventory</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Upload Images Section */}
            <div className="bg-slate-50 rounded-xl p-6 border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors duration-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <label className="text-lg font-semibold text-slate-700">Product Images</label>
              </div>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleImageChange} 
                className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-300 file:text-green-700 hover:file:bg-green-200 file:cursor-pointer cursor-pointer"
              />
              
              {formData.images.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-slate-600 mb-3">Preview ({formData.images.length} images)</h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {formData.images.map((image: File, index: number) => (
                      <div key={index} className="relative group">
                        <img 
                          src={URL.createObjectURL(image)} 
                          alt={`preview-${index}`} 
                          className="w-full h-20 object-cover rounded-lg border border-slate-200" 
                        />
                        <button
                          type="button"
                          onClick={() => deleteImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>Product Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter product name"
                required
                maxLength={20}
              />
              <p className="text-xs text-slate-500">{formData.name.length}/20 characters</p>
            </div>

            {/* Frame Size */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>Frame Size</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {["7*9", "A4", " 8*12", "A3", "12*16"].map((size) => (
                  <label key={size} className="relative">
                    <input
                      type="checkbox"
                      value={size}
                      checked={formData.frameSize.includes(size)}
                      onChange={() => handleArrayChange("frameSize", size)}
                      className="peer sr-only"
                    />
                    <div className="flex items-center justify-center px-4 py-2 rounded-lg border-2 border-slate-300 cursor-pointer transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:border-slate-400">
                      <span className="text-sm font-medium">{size}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                placeholder="Enter a brief description of the product..."
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Price */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Price</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium"></span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="0.00"
                  min={0}
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Category</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Frame Color */}
            {selectedCategory && (
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                  <span>Frame Color</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableFrameColors.map((color) => (
                    <label key={color} className="relative">
                      <input
                        type="checkbox"
                        value={color}
                        checked={formData.frameColor.includes(color)}
                        onChange={() => handleArrayChange("frameColor", color)}
                        className="peer sr-only"
                      />
                      <div className="flex items-center justify-center px-4 py-2 rounded-lg border-2 border-slate-300 cursor-pointer transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:border-slate-400">
                        <span className="text-sm font-medium">{color}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Theme Color */}
            {selectedCategory && (
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                  <span>Theme Color</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableThemeColors.map((color) => (
                    <label key={color} className="relative">
                      <input
                        type="checkbox"
                        value={color}
                        checked={formData.themeColor.includes(color)}
                        onChange={() => handleArrayChange("themeColor", color)}
                        className="peer sr-only"
                      />
                      <div className="flex items-center justify-center px-4 py-2 rounded-lg border-2 border-slate-300 cursor-pointer transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:border-slate-400">
                        <span className="text-sm font-medium">{color}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Description */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Detailed Description</span>
              </label>
              <textarea
                name="detailed_description"
                value={formData.detailed_description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 resize-none"
                placeholder="Provide a detailed description including specifications, materials, and features..."
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8 pt-6 border-t border-slate-200">
          <button
            type="submit"
            className="flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Product</span>
          </button>
        </div>
      </form>
    </div>
  );
};

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    frameSize: [] as string[],
    frameColor: [] as string[],
    themeColor: [] as string[],
    images: [] as File[],
    description: "",
    detailed_description: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5500/form");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || formData.name.length > 20) {
      return alert("Product name is required and should not exceed 20 characters.");
    }

    if (!formData.frameColor.length) {
      return alert("At least one frame color should be selected.");
    }

    if (!formData.themeColor.length) {
      return alert("At least one theme color should be selected.");
    }

    if (isNaN(formData.price) || formData.price <= 0) {
      return alert("Price must be a valid positive number.");
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", formData.price.toString());
      formDataToSend.append("frameSize", formData.frameSize.join(","));
      formDataToSend.append("frameColor", formData.frameColor.join(","));
      formDataToSend.append("themeColor", formData.themeColor.join(","));
      formDataToSend.append("description", formData.description);
      formDataToSend.append("detailed_description", formData.detailed_description);
      formData.images.forEach((file) => formDataToSend.append("images", file));

      const result = await addProduct(formDataToSend);
      if (!result.ok) {
        const errorText = await result.text();
        throw new Error(`Server responded with ${result.status}: ${errorText}`);
      }

      setSuccessMessage("Filled successfully");
      setFormData({
        name: "",
        category: "",
        price: 0,
        frameSize: [],
        frameColor: [],
        themeColor: [],
        images: [],
        description: "",
        detailed_description: "",
      });
      fetchProducts();
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fixed Sidebar */}
      <div className="fixed top-20 left-0 w-64 h-full z-10">
        <Navbar />
      </div>
      
      {/* Main Content */}
      <main className="ml-64 pt-20">
        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-24 right-8 z-50 animate-slide-in">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-6 py-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-emerald-800">Success!</p>
                  <p className="text-sm text-emerald-700">{successMessage}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="bg-white border-b border-slate-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Product Management</h1>
              <p className="text-slate-600 mt-1">Add new products to your inventory</p>
            </div>
            
            {/* Add Coupon Button */}
            <button
              onClick={() => (window.location.href = "/Admin/cop/create")}
              className="flex items-center space-x-3 bg-gradient-to-r from-red-800 to-red-300 hover:from-gray-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Coupon</span>
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <ProductForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
};

export default AddProduct;