"use client";

import Link from "next/link";
import SearchBar from "./search";
import SearchIcon from "@/components/search/SearchIcon";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { BiGitCompare} from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";




export default function Header() {
       const [isSearchOpen, setIsSearchOpen] = useState(false); 
     
  return (
      <nav  style={{ backgroundColor: "#cb1a2e" }}  className="sm:flex justify-between items-center  mx-auto px-3 py-2">
        
        <div className="h-16 w-16 overflow-hidden">
             <Link href="/">
                  <img
                   className="rounded-full w-full h-full object-cover "
                   alt="Tiny treasures logo"
                   src="/logo.jpg"
                      />
               </Link>
          </div>


        <div className="sm:flex space-x-10  justify-center  ">
          <Link href="/" className=" bttn transition">Home</Link>
          <Link href="/shop" className="font-medium bttn  transition">Shop</Link>
          <Link href="/about" className=" font-medium bttn  transition">About</Link>
          <Link href="/contact" className=" font-medium bttn  transition">Contact</Link>
        </div>

        
        <div className=" md:block w-1/5">
          <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        </div>

        
       <div className="flex space-x-2 items-center">
       <Link 
    href="/authentication/login" 
    className="flex items-center bttn1  font-medium px-2 py-2 rounded-md text-sm  transition">
    <FaUser size={20} className="mr-1 " />
    <span ></span>
  </Link>
         <Link href="/cart" className="bttn1  flex items-center space-x-2 p-2 rounded   transition">
          < FaShoppingCart size={20} />
      
        </Link>
         <Link href="/wishlist" className="bttn1  flex items-center space-x-2 p-2 rounded   transition">
          < AiFillHeart size={20} />
      
        </Link>
        <Link href="/compare" className="bttn1  flex items-center space-x-2 p-2 rounded   transition">
          < BiGitCompare size={20} />
      
        </Link>
        
        
      </div>

      </nav>
    
  );
}
