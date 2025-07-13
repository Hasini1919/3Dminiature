"use client";

import { useState } from "react";
import axios from "axios";



export default function Pdf() {
  const [pdfUrl, setPdfUrl] = useState("");

  const generatePDF = () => {
    axios.get("http://localhost:5500/generate-pdf")
      .then(response => {
        console.log("Response Data:", response.data);
      
        if (response.data.success) {
          // Use 'filepath' instead of 'filename'
          const pdfUrl = `http://localhost:5500/docs/${response.data.filepath}`;
          setPdfUrl(pdfUrl);
          
        } else {
          console.error("Invalid response format:", response.data);
        }
      })
      .catch(error => console.error("Error generating PDF:", error));
  };
  
  

 
  
  
  const downloadPDF = () => {
    console.log("PDF URL:", pdfUrl);
     
    if (!pdfUrl) {
      alert("No PDF available yet.");
      return;
    }
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("download", "User_Report.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
  };
 


  
  return (
    <>
    <div className="p-50 pt-0 text-center ">
      <button onClick={generatePDF} className="bg-green-500 text-white px-4 py-2 mt-4 rounded">Generate PDF</button>
      
      {pdfUrl && (
            <>
    <h3>Download the generated PDF</h3>
    <button onClick={downloadPDF} className="bg-red-500 text-white px-4 py-2 mt-4 rounded" >
      Download PDF
    </button>
           </>
)}

       </div>

      
       </>
  );
  
}