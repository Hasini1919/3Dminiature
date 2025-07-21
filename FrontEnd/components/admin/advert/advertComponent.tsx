// 'use client';

// import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Image from 'next/image';

// interface Advertisement {
//   title: string;
//   mainTitle: string;
//   discountPercentage: number;
//   expiresAt: string;
//   image: File | null;
// }

// const AdvertisementForm = () => {
//   const { productId } = useParams();
//   const [formData, setFormData] = useState<Advertisement>({
//     title: '',
//     mainTitle: '',
//     discountPercentage: 0,
//     expiresAt: '',
//     image: null,
//   });

//   const [existingAd, setExistingAd] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchAd = async () => {
//       try {
//         const res = await fetch(`http://localhost:5500/api/advertisements/${productId}`);
//         if (!res.ok) return;
//         const data = await res.json();
//         setExistingAd(data.advertisement);
//       } catch (error) {
//         console.error('Ad fetch error:', error);
//       }
//     };

//     fetchAd();
//   }, [productId]);

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setFormData(prev => ({ ...prev, image: file }));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     if (!formData.image) return alert("Please select an image.");

//     const body = new FormData();
//     body.append('productId', productId as string);
//     body.append('title', formData.title);
//     body.append('mainTitle', formData.mainTitle);
//     body.append('discountPercentage', formData.discountPercentage.toString());
//     body.append('expiresAt', formData.expiresAt);
//     body.append('image', formData.image);

//     try {
//       setLoading(true);
//       const res = await fetch('http://localhost:5500/api/advertisements', {
//         method: 'POST',
//         body,
//       });

//       if (!res.ok) throw new Error('Ad creation failed');

//       const result = await res.json();
//       alert('Advertisement created!');
//       setExistingAd(result.ad);
//       setFormData({
//         title: '',
//         mainTitle: '',
//         discountPercentage: 0,
//         expiresAt: '',
//         image: null,
//       });
//     } catch (err) {
//       alert('Error creating advertisement.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete the advertisement?")) return;

//     try {
//       const res = await fetch(`http://localhost:5500/api/advertisements/${productId}`, {
//         method: 'DELETE',
//       });

//       if (!res.ok) throw new Error('Delete failed');

//       alert('Advertisement deleted.');
//       setExistingAd(null);
//     } catch (err) {
//       alert('Failed to delete advertisement.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Advertisement Form</h2>

//       {existingAd && (
//         <div className="mb-4 border p-4 rounded-md bg-gray-50">
//           <h3 className="font-semibold">Current Advertisement</h3>
//           <p className="text-sm text-gray-700">Title: {existingAd.title}</p>
//           <p className="text-sm text-gray-700">Main Title: {existingAd.mainTitle}</p>
//           <p className="text-sm text-gray-700">Discount: {existingAd.discountPercentage}%</p>
//           <p className="text-sm text-gray-700">Expires: {new Date(existingAd.expiresAt).toLocaleDateString()}</p>
//           <div className="mt-2">
//             <Image
//               src={`http://localhost:5500/images/${existingAd.img.split("src/products/")[1]}`}
//               alt="Ad"
//               width={300}
//               height={200}
//               className="rounded"
//             />
//           </div>
//           <button
//             onClick={handleDelete}
//             className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
//           >
//             Delete Advertisement
//           </button>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="text"
//           name="mainTitle"
//           placeholder="Main Title"
//           value={formData.mainTitle}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="number"
//           name="discountPercentage"
//           placeholder="Discount %"
//           value={formData.discountPercentage}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="date"
//           name="expiresAt"
//           value={formData.expiresAt}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//         >
//           {loading ? 'Submitting...' : 'Create Advertisement'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdvertisementForm;
