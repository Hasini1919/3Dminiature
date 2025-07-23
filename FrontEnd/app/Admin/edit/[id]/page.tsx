// i change here

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InputField from "@/components/admin/InputField";
import { arrayToString, stringToArray } from "@/utils/Admin/editUtils";
import { ProductFormData } from "@/types/admin/edit";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const [formData, setFormData] = useState<Omit<ProductFormData, "image">>({
    name: "",
    price: "",
    category: "",
    description: "",
    frameSize: [],
    frameColor: [],
    themeColor: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5500/product/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");

        const data = await res.json();

        const fullImagePaths = (data.images || []).map((img: string) =>
          `http://localhost:5500/images/${img.replace(/\\/, "")}`
        );

        setExistingImages(fullImagePaths);
        setFormData({
          name: data.name || "",
          price: data.price || "",
          category: data.category || "",
          description: data.description || "",
          frameSize: data.frameSize || [],
          frameColor: data.frameColor || [],
          themeColor: data.themeColor || [],
        });
      } catch (err) {
        setError("Failed to load product data.");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (["frameSize", "frameColor", "themeColor"].includes(name)) {
      setFormData({ ...formData, [name]: stringToArray(value) });
    } else if (name === "price") {
      setFormData({ ...formData, price: value === "" ? "" : Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("price", String(formData.price));
    form.append("category", formData.category);
    form.append("description", formData.description);
    form.append("frameSize", JSON.stringify(formData.frameSize));
    form.append("frameColor", JSON.stringify(formData.frameColor));
    form.append("themeColor", JSON.stringify(formData.themeColor));
    form.append("deletedImages", JSON.stringify(deletedImages));

    newFiles.forEach((file) => {
      form.append("newImages", file);
    });

    try {
      const res = await fetch(`http://localhost:5500/product/${id}`, {
        method: "PUT",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to update product");

      // Clear new files and previews after success
      setNewFiles([]);
      setNewPreviews([]);
      alert("Product updated successfully!");
      router.push("/Admin/Product/Table");
    } catch (err) {
      setError("Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/Admin/Product/Table")}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Products
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h1 className="text-xl font-semibold text-gray-900">Edit Product</h1>
              </div>
            </div>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Product ID: {id}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Basic Information
              </h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  id="name"
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputField
                  id="price"
                  label="Price (Rs.)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <InputField
                  id="category"
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>

              <InputField
                id="description"
                label="Product Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                isTextArea
              />
            </div>
          </div>

          {/* Product Specifications */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h4" />
                </svg>
                Product Specifications
              </h2>
              <p className="text-sm text-gray-500 mt-1">Configure frame sizes, colors, and theme options</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <InputField
                  id="frameSize"
                  label="Frame Sizes"
                  name="frameSize"
                  value={arrayToString(formData.frameSize)}
                  onChange={handleChange}
                  placeholder="e.g. Small, Medium, Large"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  id="frameColor"
                  label="Frame Colors"
                  name="frameColor"
                  value={arrayToString(formData.frameColor)}
                  onChange={handleChange}
                  placeholder="e.g. Red, Blue, Green"
                />
                <InputField
                  id="themeColor"
                  label="Theme Colors"
                  name="themeColor"
                  value={arrayToString(formData.themeColor)}
                  onChange={handleChange}
                  placeholder="e.g. Light, Dark, Colorful"
                />
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Product Images
              </h2>
              <p className="text-sm text-gray-500 mt-1">Manage existing images and upload new ones</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Image Gallery */}
              {(existingImages.length > 0 || newPreviews.length > 0) && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Current Images</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {existingImages.map((img, index) => (
                      <div key={`existing-${index}`} className="relative group">
                        <div className="aspect-square rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50">
                          <img
                            src={img}
                            alt={`existing-${index}`}
                            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-200"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const relativePath = img.replace("http://localhost:5500/images/", "");
                            setDeletedImages((prev) => [...prev, relativePath]);
                            setExistingImages((prev) => prev.filter((_, i) => i !== index));
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200 shadow-lg"
                        >
                          ×
                        </button>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Click × to remove
                          </span>
                        </div>
                      </div>
                    ))}

                    {newPreviews.map((img, index) => (
                      <div key={`new-${index}`} className="relative group">
                        <div className="aspect-square rounded-lg border-2 border-green-200 overflow-hidden bg-gray-50">
                          <img
                            src={img}
                            alt={`preview-${index}`}
                            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-200"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setNewPreviews((prev) => prev.filter((_, i) => i !== index));
                            setNewFiles((prev) => prev.filter((_, i) => i !== index));
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200 shadow-lg"
                        >
                          ×
                        </button>
                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                          NEW
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Images */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Add New Images</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Click to upload images
                      </span>
                      <span className="mt-1 block text-sm text-gray-500">
                        PNG, JPG, GIF up to 10MB each
                      </span>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (!files) return;

                          const fileArray = Array.from(files);
                          setNewFiles((prev) => [...prev, ...fileArray]);

                          const previews = fileArray.map((file) => URL.createObjectURL(file));
                          setNewPreviews((prev) => [...prev, ...previews]);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.push("/Admin/Product/Table")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-md font-medium focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-emerald-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm hover:shadow-md"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Product...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}