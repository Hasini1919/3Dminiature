// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export const dynamic = 'force-dynamic';

// const VerifyCode = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [code, setCode] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isInitialized, setIsInitialized] = useState(false); // Added this line

//   useEffect(() => {
//   // Try multiple ways to get the code
//   const urlCode = searchParams?.get("code");
  
//   // Alternative methods
//   let manualCode = null;
//   if (typeof window !== 'undefined') {
//     // Try standard URL search params
//     const params = new URLSearchParams(window.location.search);
//     manualCode = params.get("code");
    
//     // Try hash fragment if using SPA routing
//     if (!manualCode && window.location.hash.includes('code=')) {
//       const hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
//       manualCode = hashParams.get("code");
//     }
//   }

//   const finalCode = urlCode || manualCode;
//   console.log("Code detection:", { urlCode, manualCode, finalCode });

//   if (finalCode) {
//     setCode(decodeURIComponent(finalCode));
//   } else {
//     setMessage("❌ No verification code provided");
//   }
//   setIsInitialized(true);
// }, [searchParams]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!code.trim()) return;

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5500/api/auth/verify-code", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ code }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || "Verification failed");

//       setMessage("✅ Code verified! Redirecting...");
//       setTimeout(() => {
//         router.push(`/resetPassword?code=${encodeURIComponent(code)}`);
//       }, 1500);
//     } catch (err: any) {
//       setMessage(`❌ ${err.message || "Verification failed"}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isInitialized) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
//           <p>Loading verification...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!code && message) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
//           <p className="text-red-500">{message}</p>
//           <button
//             onClick={() => router.push("/resetPassword")}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Back to Reset Password
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-md w-96">
//         <h2 className="text-2xl font-semibold text-center mb-4">Verify Your Code</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             placeholder="Enter verification code"
//             className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading || !code.trim()}
//              onClick={() => router.push("/newPassword")}
//             className={`w-full mt-4 py-2 rounded-md text-white ${
//               loading ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
//             } transition-colors`}
//           >
//             {loading ? "Verifying..." : "Verify Code"}
//           </button>
//         </form>
//         {message && (
//           <p className={`mt-4 text-center ${message.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VerifyCode;