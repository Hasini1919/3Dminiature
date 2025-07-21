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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-emerald-700">
            Edit Product
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Update the details of your product
          </p>
        </div>

        {error && (
          <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />
            <InputField
              id="category"
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            <InputField
              id="frameSize"
              label="Frame Sizes"
              name="frameSize"
              value={arrayToString(formData.frameSize)}
              onChange={handleChange}
              placeholder="e.g. Small, Medium"
            />
            <InputField
              id="frameColor"
              label="Frame Colors"
              name="frameColor"
              value={arrayToString(formData.frameColor)}
              onChange={handleChange}
              placeholder="e.g. Red, Blue"
            />
            <InputField
              id="themeColor"
              label="Theme Colors"
              name="themeColor"
              value={arrayToString(formData.themeColor)}
              onChange={handleChange}
              placeholder="e.g. Green, Yellow"
            />
          </div>

          <InputField
            id="description"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            isTextArea
          />

          <div className="flex flex-wrap gap-3 mt-3">
            {existingImages.map((img, index) => (
              <div key={`existing-${index}`} className="relative group">
                <img
                  src={img}
                  alt={`existing-${index}`}
                  className="w-24 h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => {
                    const relativePath = img.replace("http://localhost:5500/images/", "");
                    setDeletedImages((prev) => [...prev, relativePath]);
                    setExistingImages((prev) => prev.filter((_, i) => i !== index));
                  }}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 py-0.5 rounded opacity-80 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}

            {newPreviews.map((img, index) => (
              <div key={`new-${index}`} className="relative group">
                <img
                  src={img}
                  alt={`preview-${index}`}
                  className="w-24 h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
                    setNewFiles((prev) => prev.filter((_, i) => i !== index));
                  }}
                  className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 py-0.5 rounded opacity-80 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            multiple
            accept="images/*"
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;

              const fileArray = Array.from(files);
              setNewFiles((prev) => [...prev, ...fileArray]);

              const previews = fileArray.map((file) => URL.createObjectURL(file));
              setNewPreviews((prev) => [...prev, ...previews]);
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-700 hover:bg-emerald-800"
            } transition duration-200 font-semibold`}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
