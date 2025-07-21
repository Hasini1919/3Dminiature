// "use client";

// import React from "react";

// export const ProductForm = ({
//   formData,
//   setFormData,
//   handleSubmit,
//   frameColors,
//   themeColors,
// }: {
//   formData: any;
//   setFormData: any;
//   handleSubmit: (e: React.FormEvent) => void;
//   frameColors: string[];
//   themeColors: string[];
// }) => {
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, files } = e.target as HTMLInputElement;
//     if (name === "image" && files) {
//       setFormData({ ...formData, image: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selected = Array.from(e.target.selectedOptions, option => option.value);
//     setFormData({ ...formData, [e.target.name]: selected });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="text"
//         name="name"
//         value={formData.name}
//         onChange={handleInputChange}
//         placeholder="Product Name"
//         className="w-full border px-4 py-2 rounded"
//       />
//       <select
//         name="category"
//         value={formData.category}
//         onChange={handleInputChange}
//         className="w-full border px-4 py-2 rounded"
//       >
//         <option value="">Select Category</option>
//         <option value="Wedding">Wedding</option>
//         <option value="Birthday">Birthday</option>
//         <option value="Baby">Baby</option>
//         <option value="Graduation">Graduation</option>
//         <option value="Family">Family</option>
//       </select>

//       <input
//         type="number"
//         name="price"
//         value={formData.price}
//         onChange={handleInputChange}
//         placeholder="Price"
//         className="w-full border px-4 py-2 rounded"
//       />

//       <select
//         name="frameColor"
//         multiple
//         value={formData.frameColor}
//         onChange={handleMultiSelectChange}
//         className="w-full border px-4 py-2 rounded"
//       >
//         <option disabled>-- Select Frame Colors --</option>
//         {frameColors.map(color => (
//           <option key={color} value={color}>
//             {color}
//           </option>
//         ))}
//       </select>

//       <select
//         name="themeColor"
//         multiple
//         value={formData.themeColor}
//         onChange={handleMultiSelectChange}
//         className="w-full border px-4 py-2 rounded"
//       >
//         <option disabled>-- Select Theme Colors --</option>
//         {themeColors.map(color => (
//           <option key={color} value={color}>
//             {color}
//           </option>
//         ))}
//       </select>

//       <input
//         type="file"
//         name="image"
//         onChange={handleInputChange}
//         className="w-full"
//         accept="image/*"
//       />

//       <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//         Submit
//       </button>
//     </form>
//   );
// };
