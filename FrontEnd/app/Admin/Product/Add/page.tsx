"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { addProduct } from "@/utils/Admin/api";
import Slidebar from "@/components/Admin_sidebar/Slidebar";

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
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto relative border mt-9 border-gray-300"
    >
      <div className="absolute left-0 top-0 h-full w-2 bg-gray-500 rounded-l-lg"></div>
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Add Product</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Upload Images */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Upload Images</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full" />
            <div className="flex flex-wrap gap-4 mt-3">
              {formData.images.map((image: File, index: number) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(image)} alt={`preview-${index}`} className="w-20 h-20 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() => deleteImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter product name"
              required
              maxLength={20}
            />
          </div>

          {/* Frame Size */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Frame Size</label>
            <div className="flex flex-wrap gap-4 mt-1">
              {["A4", "A3", "8*15"].map((size) => (
                <label key={size} className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    value={size}
                    checked={formData.frameSize.includes(size)}
                    onChange={() => handleArrayChange("frameSize", size)}
                    className="rounded border-gray-300"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-4 border rounded-md resize-none"
              placeholder="Enter description"
              required
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Price */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter price"
              min={0}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Frame Color */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Frame Color</label>
            <div className="flex flex-wrap gap-4 mt-1">
              {availableFrameColors.map((color) => (
                <label key={color} className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    value={color}
                    checked={formData.frameColor.includes(color)}
                    onChange={() => handleArrayChange("frameColor", color)}
                    className="rounded border-gray-300"
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Theme Color */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Theme Color</label>
            <div className="flex flex-wrap gap-4 mt-1">
              {availableThemeColors.map((color) => (
                <label key={color} className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    value={color}
                    checked={formData.themeColor.includes(color)}
                    onChange={() => handleArrayChange("themeColor", color)}
                    className="rounded border-gray-300"
                  />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Detailed Description</label>
            <textarea
              name="detailed_description"
              value={formData.detailed_description}
              onChange={handleChange}
              className="w-full p-4 border rounded-md resize-none"
              placeholder="Enter detailed description"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition"
        >
          Add Product
        </button>
      </div>
    </form>
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
    <div className="flex min-h-screen pt-20">
      <div className="fixed top-20 left-0 w-64 h-full z-10">
        <Slidebar />
      </div>
      <main className="ml-64 flex-grow p-8 bg-gray-50 min-h-screen">
        {successMessage && (
          <div className="fixed top-20 right-8 bg-green-100 text-green-800 border border-green-400 px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
            <strong className="font-semibold">Success!</strong>
            <div className="text-sm">{successMessage}</div>
          </div>
        )}

        {/* Add Coupon Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => (window.location.href = "/Admin/cop/create")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg transition-transform transform hover:scale-105 focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Coupon
          </button>
        </div>

        <ProductForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default AddProduct;
