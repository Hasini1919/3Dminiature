import React from "react";

const PaymentForm = () => {
  return (
    <div className="w-[90%] ">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>

      <form className="space-y-12 ">
        <div className="p-2">
          <label className="block text-sm font-medium uppercase mb-2">Cardholder  Name</label>
          <input
            type="text"
          
           className="w-full p-2 rounded outline-none border-gray-300 border hover:border-green-500"
          />
        </div>

        <div className="p-2">
          <label className="block text-sm font-medium uppercase mb-2">Card Number</label>
          <div className="grid grid-cols-4 gap-2">
            <input type="text" maxLength={4} className="p-2  rounded outline-none border border-gray-300 hover:border-green-500" />
            <input type="text" maxLength={4} className="p-2 rounded outline-none border-gray-300 border hover:border-green-500" />
            <input type="text" maxLength={4} className="p-2 outline-none  rounded border-gray-300 border hover:border-green-500" />
            <input type="text" maxLength={4} className="p-2 outline-none border-gray-300 rounded border hover:border-green-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-2">
            <label className="block text-sm font-medium uppercase mb-2">Expiry Date</label>
            <input
              type="text"
              placeholder="MM / YYYY"
              className="w-full p-2 rounded outline-none border-gray-300 border hover:border-green-500"
            />
          </div>
          <div className="p-2">
            <label className="block text-sm font-medium uppercase mb-2 ">CVV</label>
            <input
              type="text"
          
              className="w-full p-2 rounded outline-none border-gray-300 border hover:border-green-500 "
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-1/2  text-white p-2 rounded font-semibold hover:bg-green-600 cursor-pointer "
        >
          PAY NOW
        </button>
       
        
      </form>
    </div>
  );
};

export default PaymentForm;