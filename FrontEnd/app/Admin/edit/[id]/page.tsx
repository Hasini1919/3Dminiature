"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InputField from "@/components/admin/InputField";
import { arrayToString, stringToArray } from "@/utils/Admin/editUtils";
import { ProductFormData } from "@/types/admin/edit";




export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    category: "",
    description: "",
    images: [],
    frameSize: [],
    frameColor: [],
    themeColor: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:5500/product/${id}`);
      const data = await res.json();

      const fullImagePaths = (data.images || []).map((img: string) =>
        `http://localhost:5500/src/uploads/${img.replace(/\\/g, "/")}`
      );

      setFormData({
        name: data.name || "",
        price: data.price || "",
        category: data.category || "",
        description: data.description || "",
        images: fullImagePaths,
        frameSize: data.frameSize || [],
        frameColor: data.frameColor || [],
        themeColor: data.themeColor || [],
      });
    };

    if (id) fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (["images", "frameSize", "frameColor", "themeColor"].includes(name)) {
      setFormData({ ...formData, [name]: stringToArray(value) });
    } else if (name === "price") {
      setFormData({ ...formData, price: value === "" ? "" : Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = { ...formData, price: Number(formData.price) };

    const res = await fetch(`http://localhost:5500/product/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      alert("Product updated successfully!");
      router.push("/Admin/Product/Table");
    } else {
      alert("Failed to update product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-emerald-700">Edit Product</h1>
          <p className="mt-2 text-sm text-gray-500">Update the details of your product</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField id="name" label="Product Name" name="name" value={formData.name} onChange={handleChange} />
            <InputField id="price" label="Price" name="price" type="number" value={formData.price} onChange={handleChange} />
            <InputField id="category" label="Category" name="category" value={formData.category} onChange={handleChange} />
            <InputField id="frameSize" label="Frame Sizes" name="frameSize" value={arrayToString(formData.frameSize)} onChange={handleChange} placeholder="e.g. Small, Medium" />
            <InputField id="frameColor" label="Frame Colors" name="frameColor" value={arrayToString(formData.frameColor)} onChange={handleChange} placeholder="e.g. Red, Blue" />
            <InputField id="themeColor" label="Theme Colors" name="themeColor" value={arrayToString(formData.themeColor)} onChange={handleChange} placeholder="e.g. Green, Yellow" />
          </div>

          <InputField
            id="description"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            isTextArea
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">Product Images</label>
            {formData.images.length > 0 ? (
              <div className="flex flex-wrap gap-3 mt-3">
                {formData.images.map((img, index) => (
                  <img key={index} src={img} alt={`product-image-${index}`} className="w-24 h-24 object-cover rounded border" />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">No images available</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Upload New Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                if (!files) return;

                const urls = Array.from(files).map((file) => URL.createObjectURL(file));
                setFormData((prev) => ({ ...prev, images: urls }));
              }}
              className="mt-2"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-emerald-700 hover:bg-emerald-800 transition duration-200 font-semibold"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
