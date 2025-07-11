"use client"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Scroller from "./scrolltxt";
import ScrollerImg from "./scrollImage";

interface Posts {
  image: string;
  title: string;
  description: string;
  _id:string;
  
}


export default function Homepage() {
  const [posts,setPosts] = useState<Posts[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [search,setSearch] = useState(false);

  useEffect(()=>{
    fetch(process.env.NEXT_PUBLIC_API_URL + '/posts')
    .then((res)=> res.json())
    .then((res)=> setPosts(res))
  },[]);

  const searchPost = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>)=> {
    if ("key" in e && e.key !== "Enter"){
     return
    }
    setSearch(true);
    if (!inputRef.current) return; 
    const query = inputRef.current.value.trim();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?q=${query}`)
    .then((res)=> res.json())
    .then((res)=> setPosts(res))
    .finally(()=> setSearch(false))
  }
  return (
   
      <>  
      <div className=" mx-auto px-4 py-6 h-screen h-fit  bg-center bg-fixed text-white " style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/picture.avif')" }}>
        <h1 className="text-5xl font-bold  mb-12 px-60 py-6  text-center">Modern frames, your way
        design, customize, and cherish in 3D!</h1>
       
          {/* Container for 3 Columns */}
  <div className="grid grid-cols-3 gap-6 place-items-center ">
    {/* Image Column 1 */}
    <div className="text-center">
      <Image src="/picture.avif" width={250} height={450} alt="pic" className="rounded-md" />
      
    </div>
    {/* Image Column 2 */}
    <div className="text-center ">
      <Image src="/IMG-20250309-WA0004.jpg" width={250} height={200} alt="pic" className="rounded-lg" />
    </div>
    {/* Image Column 3 */}
    <div className="text-center">
      <Image src="/picture.avif" width={250} height={450} alt="pic" className="rounded-lg" />
    </div>
  </div>
      </div>
      <div className=" mx-auto px-0 py-0">
      <Scroller/>
      </div>
       
      
      <div className="text-center mt-20 mb-10 text-2xl font-bold">
      <h1 className="text-center mt-20 text-4xl font-bold">Top Categories</h1>
      </div>
      <div className="wrapper container mx-auto p-5">
  <div className="grid grid-cols-1  md:grid-cols-3 gap-20 mx-32">
    <div className="card  mt-[20px]  ">
      <img src="/IMG-20250309-WA0009.jpg" alt="Image 1" />
      <p>Family</p>
    </div>
    <div className="card   mt-[-50px]">
      <img src="/IMG-20250309-WA0010.jpg" alt="Image 2" />
      <p>Baby</p>
    </div>
    <div className="card  mt-[20px]">
      <img src="/IMG-20250309-WA0008.jpg" alt="Image 3" />
      <p>Wedding</p>
    </div>
  </div>
</div>




     
      <div className="text-center mt-20 ">
        <h1 className="text-center text-4xl font-bold">Our Frame Process</h1>
        </div>
      <div className="container mx-auto flex flex-col md:flex-row sm:gap-12 mt-12 ">
        <div className="md:w-1/3 text-center flex flex-col items-center">
          <h3 className="text-2xl mb-2 font-bold">Take a Order</h3>
          <img className="h-28 w-28 rounded-full border-4 border-red-500" src="/take.svg" alt="" />
          <p className=" font-bold  ">We start by understanding your unique frame needs</p>
        </div>
        <div className="md:w-1/3 text-center flex flex-col items-center">
          <h3 className="text-2xl mb-2 font-bold">make Product</h3>
          <img className="h-28 w-28 rounded-full border-4 border-red-500" src="/process.svg" alt="" />
          <p className="font-bold">Our team crafts your frame with precision and care</p>
        </div>
        <div  className="md:w-1/3 text-center flex flex-col items-center">
          <h3 className="text-2xl mb-2 font-bold">Deliver Product</h3>
          <img className="h-28 w-28 rounded-full border-4 border-red-500" src="/deliver.svg" alt="" />
          <p className="font-bold">Your beautifully  frame is  delivered to your doorstep</p>
        </div>
      </div>

      <div className="text-center mt-20 mb-15 ">
        <h1 className="text-center text-4xl font-bold">Our frames in Action</h1>
        </div>
        <div className="container mx-auto flex flex-col md:flex-row sm:gap-12 mt-12 text-center">
                   <p className=" text-center font-bold px-30 text-xl ">
    Explore our portfolio to see how our app brings memories to life. From heartfelt family moments
    to modern 3D creations, our designs highlight the beauty and versatility of our app.
                   </p>
          </div>
          <div className=" mx-auto px-0 py-0">
      <ScrollerImg/>
      </div>

      
    </>
  );
}
