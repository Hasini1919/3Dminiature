"use client";
import React from 'react'
import { CgProfile } from "react-icons/cg";
import { TiShoppingCart } from "react-icons/ti";
import { VscPreview } from "react-icons/vsc";
import { IoSettingsSharp } from "react-icons/io5";
import Link from 'next/link';


function SlideBar() {
  return (
  <aside className='h-dvh sticky  bg-gray-300 grid grid-rows-12 shadow-md '>
   
    <div className='row-span-1 h-full'>
    </div>
    <div className='row-span-4 grid gap-4  h-full'>
    
     <div className="flex items-center justify-center hover:bg-gray-300 " title='MyAccount'>
      <Link href={"/my-account/account"}>
      <CgProfile size={24}  />
      </Link>
     </div>
     <div className="flex items-center justify-center hover:bg-gray-300" title='MyOrders'>
      <Link href={"/my-account/orders"}>
      <TiShoppingCart size={24} />
      </Link>
     </div>
     <div className="flex items-center justify-center hover:bg-gray-300"title='MyRivews'>
      <Link href={"/my-account/riviews"}>
      <VscPreview size={24}/>
      </Link>
     </div>
     <div className="flex items-center justify-center hover:bg-gray-300" title='Setting'>
      <Link href={"/my-account/settings"}>
      <IoSettingsSharp size={24}/>
      </Link>
     </div>
    
    </div>
    <div className='row-span-7 h-full'>

    </div>
   
   
  </aside>
  )
}

export default SlideBar;