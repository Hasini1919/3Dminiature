
"use client";

import Link from 'next/link';
import { Kalam } from "next/font/google";
const kalam = Kalam({ subsets: ["latin"], weight: ["400", "700"] });
import Image from 'next/image';
import Subscribe from './subscribe';


export default function Footer() {
     
  return (
    <>
    <footer className=" mx-auto bg-stone-950/80 mt-4 p-0 ">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-4">
    
    
    <div className=" sm:w-1/3 text-white p-2 text-center sm:text-left">
      <h3 className={`${kalam.className} text-3xl !text-red-800`}>Tiny Treasure</h3>
      <p className='text-lg'>
        Unleashing creativity with personalized 3D gifts and designs that make
        every moment unforgettable.
      </p>
      <p className='text-lg'>Call us: 0774582344</p>
    </div>
   
  
    <div className="sm:w-1/3 text-white space-y-2 sm:px-10 text-center sm:text-left p-4">
      <p className='text-lg'>Subscribe to explore the latest in personalized 3D designs and exclusive updates!</p>
     <Subscribe/>
    </div>
  


    {/* Follow Us Section */}
    <div className="   sm:w-1/3 flex justify-end flex-col items-between sm:items-start text-white pt-0 p-4 ">
      <h4 className="mb-2 text-center sm:text-left text-xl text-bold">Follow Us</h4>
      <div className="flex gap-4 justify-center sm:justify-start">
        <Link href="https://www.facebook.com/profile.php?id=61567273401352" target="_blank">
          <Image src="/facebook-1-svgrepo-com.svg" alt="Facebook" width={30} height={30} />
        </Link>
        <Link href="https://www.tiktok.com/@tt_tinytreasures" target="_blank">
          <Image src="/tiktok-svgrepo-com.svg" alt="TikTok" width={30} height={30} />
        </Link>
      </div>
    </div>
        </div>

  <div style={{ backgroundColor: '#cb1a2e' }} className=' mx-auto p-0'>
    <div className=" mx-auto flex justify-between items-center px-5 py-1">
      <p className="text-sm text-black mt-3 mb-2">
        &copy; {new Date().getFullYear()} All rights reserved
      </p>
      <div className="footer">
        <div className='flex space-x-7'>
          <Link href="/" className="text-black ">
          Privacy policy
          </Link>
          <Link href="/" className="text-black">
            Teams of use
          </Link>
          <Link href="/" className="text-black">
          Sales and refunds
          </Link>
        </div>
      </div>
    </div>
  </div>   
       

      
      </footer>
      
      </>
  );
}
