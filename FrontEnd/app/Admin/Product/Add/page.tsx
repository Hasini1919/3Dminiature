"use client";

import { useState, ChangeEvent, FormEvent ,useEffect } from "react";
import { addProduct } from "@/utils/Admin/api";
import Slidebar from "@/components/Admin_sidebar/Slidebar";
const API_URL = "http://localhost:5500/form";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: string;
  frameSize: string;
  frameColor: string[];
  themeColor: string[];
  images: string[]; 
  description: string;
};



const categories = ["Wedding", "Birthday", "Baby" ,"Graduation", "Family"];
const frameColors =[
  "Black",
  "Brown",
  "Red",
];

const themeColors = [
  "Blue",
  "Pink",
  "Green",
];

const ProductForm = ({ 
  formData,
  setFormData, 
  handleSubmit ,
}:  {
  formData: any;
  setFormData: any;
  handleSubmit: (e: FormEvent) => void;
}) =>{
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev: any) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleColorChange = (color: string) => {
    setFormData((prev: any) => {
      const newColors = prev.frameColor.includes(color)
        ? prev.frameColor.filter((c: string) => c !== color)
        : [...prev.frameColor, color];
      return { ...prev, frameColor: newColors };
    });
  };

  const handlethemeColor = (color: string) => {
    setFormData((prev: any) => {
      const newColors = prev.themeColor.includes(color)
        ? prev.themeColor.filter((c: string) => c !== color)
        : [...prev.themeColor, color];
      return { ...prev, themeColor: newColors };
    });
  };


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData((prev: any) => ({ ...prev, images: [...prev.images, ...filesArray] }));
    }
  };

  const deleteImage = (index: number) => {
    setFormData((prev: any) => ({ ...prev, images: prev.images.filter((_: any, i: number) => i !== index) }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-4xl ml-96 relative border mt-9 border-gray-300">
      <div className="absolute left-0 top-0 h-full w-2 bg-gray-500 rounded-l-lg"></div>

      <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Add Product</h2>

      {/* Form Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Upload Images</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full" />
            <div className="flex flex-wrap gap-4 mt-3">
              {formData.images.map((image: File, index: number) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(image)} alt={`preview-${index}`} className="w-20 h-20 object-cover rounded-md" />
                  <button type="button" onClick={() => deleteImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs">X</button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Enter product name" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Frame Size</label>
            <select name="frameSize" value={formData.frameSize} onChange={handleChange} className="w-full p-2 border rounded-md" required >
              <option value = "">Select Frame Size</option>
              <option value="A4">A4</option>
              <option value="A3">A3</option>
              <option value="8*15">8*15</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-4 border rounded-md" placeholder="Enter description" required />
          </div>

        </div>

        {/* Right Side */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Enter price" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded-md required ">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Frame Color</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {frameColors.map((color) => (
                <label key={color} className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" value={color} checked={formData.frameColor.includes(color)} onChange={() => handleColorChange(color)} className="rounded border-gray-300" />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Theme Color Section */}
          <div className="mt-8">
            <label className="block text-sm text-gray-600">Theme Color</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {themeColors.map((color) => (
                <label key={color} className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" value={color} checked={formData.themeColor.includes(color)} onChange={() => handlethemeColor(color)} className="rounded border-gray-300" />
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">Add Product</button>
      </div>

    </form>
  );
};


const AddProduct = () => {

  const [formData, setFormData] = useState({
    name: "",
    category: "", // 
    price: "",
    frameSize: "",
    frameColor: [] as string[],
    themeColor: [] as string[], 
    images: [] as File[],
    description: "",
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

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    //validation
    if(!formData.name || formData.name.length>20){
      alert("Product name is required and should not exceed 20 characters.");
      return;
    }

    if(formData.frameColor.length===0){
      alert("Atleast one frame color should be selected.");
      return;
    }

    if(formData.themeColor.length===0){
      alert("Atleast one theme color should be selected");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("frameSize", formData.frameSize);
    formDataToSend.append("description", formData.description);
   // formDataToSend.append('images', formData.images[0]);
    formDataToSend.append("frameColor", formData.frameColor.join(","));
    formDataToSend.append("themeColor", formData.themeColor.join(","));
  
    // Append images
    formData.images.forEach((file) => formDataToSend.append("images", file));
  

    fetchProducts(); //  Refresh product list
    try {
      const result = await addProduct(formDataToSend); 
      if (!result.ok) {
        const errorMessage = await result.text();
        throw new Error(`Server responded with ${result.status}: ${errorMessage}`);
      }else{
        setSuccessMessage("Filled successfully ✅");

        setFormData({
          name: "",
          category: "",
          price: "",
          frameSize: "",
          frameColor: [],
          themeColor: [],
          images: [],
          description: "",
        });

        fetchProducts();

      // Hide 
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      }
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <div className="flex pt-20 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 fixed top-20 left-0 h-full z-10">
        <Slidebar />
      </div>

    <div className="pt-20 min-h-screen items-center justify-center  block">
      {successMessage && ( <div className="fixed top-20 right-8 bg-green-100 text-green-800 border border-green-400 px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
    <strong className="font-semibold">Success!</strong>
    <div className="text-sm">{successMessage}</div>
  </div>
      )}
      <ProductForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
    
    </div>
    </div>
  );
  
};



export default AddProduct;

