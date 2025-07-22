import axios from "axios";
const API_URL = "http://localhost:5500";



//Add product
export const addProduct = async (productData : FormData) => {
    console.log("Product Data Sent:", productData); // Debugging log

    // Debugging: Log FormData contents
    for (let [key, value] of productData.entries()) {
        console.log(key, value);
    }    
    
    const response = await fetch(`${API_URL}/form`,{
        method: "POST" ,
        body: productData,
        // headers: {},
    });
    // const data = await response.json();
    // console.log("API Response:", data); // Debugging log
     return response;
 
};


//Get product
export const getProducts = async () => {
    const response = await fetch(`${API_URL}/form`);
    return response.json();
  };
