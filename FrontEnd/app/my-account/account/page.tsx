import React from 'react'

const Account= () => {
  return (
    <div className=' grid grid-rows-12 h-dvh p-4  shadow-md '>
      <div className='row-span-1  bg-gray-300 rounded-tl-xl rounded-tr-xl h-full'>
         
      </div>
      <div className='row-span-2   grid grid-cols-12 h-full '>
        <div className='col-span-5  flex justify-center items-center gap-3'>
        <img className="rounded-full w-24 h-24 object-cover bg-gray-300" src="/img/profile.jpg" 
        alt='profileImage'/>
        <div>
        <p className="font-medium ">Jay Riemenschneider</p>
        <p>jason.riemenschneider@vandelayindustries.com</p>
        </div>
        </div>
        <div className='col-span-5 '></div>
        <div className='col-span-2  flex justify-center items-center'>
          <button type='submit'className='bg-gray-300 w-1/2 rounded p-1 cursor-pointer'>
          Edit
          </button>
        </div>
       
      </div>
      <div className='row-span-9 p-8 h-full'>
        <form className='grid grid-cols-12 gap-24 '>
         
          <div className='col-span-6 space-y-12 '>
          <div className='space-y-1'>
          <label htmlFor='Full Name' className='block font-medium text-sm '>Full Name</label>
          <input  type="text" className="w-full p-2 rounded outline-none  bg-gray-100"
          placeholder='Full Name'/>
          </div>
          <div className='space-y-1'>
          <label htmlFor='Gender' className='block font-medium text-sm '>Gender</label>
          <input className="w-full p-2 rounded outline-none bg-gray-100"
          placeholder='Gender'/>
          </div>
          <div className='space-y-1'>
          <label htmlFor='Mobile Number' className='block font-medium text-sm '>Mobile Number</label>
          <input className="w-full p-2 rounded outline-none bg-gray-100 "
          placeholder='Mobile Number'/>
          </div>
          </div>
          


          <div className='col-span-6 space-y-12'>
          <div className='space-y-1'>
          <label htmlFor='Email Address' className='block font-medium text-sm '>Email Address|change</label>
          <input className="w-full p-2 rounded outline-none bg-gray-100"
          placeholder='Email Address'/>
          </div>
          <div className='space-y-1'>
          <label htmlFor='Birthday' className='block font-medium text-sm '>Birthday</label>
          <input className="w-full p-2 rounded outline-none bg-gray-100"placeholder='Birthday '/>
          </div>
          </div>
          
        
        </form>
         
      </div>


      
    </div>
  )
}

export default Account;