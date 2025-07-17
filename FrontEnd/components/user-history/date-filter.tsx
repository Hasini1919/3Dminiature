'use client';

import React, { useState } from 'react';


interface DateFilterProps {
  onFilter: (from: string, to: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilter }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleClick = () => {
    onFilter(from, to);
  };

  return (
    <div className='grid grid-cols-12 h-full items-center gap-2 '>
      <div className='col-span-4 space-x-1'>
        <label className="text-sm font-medium">From:</label>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border px-2 py-1 rounded cursor-pointer"
          max={to}
        />
      </div>
      <div className='col-span-4 space-x-1'>
        <label className="text-sm font-medium">To:</label>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border px-2 py-1 rounded cursor-pointer"
          min={from}
        />
      </div>
      <button
        onClick={handleClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-gray-800 col-span-2 cursor-pointer"
      >
        Filter
      </button>
      <button
      
      onClick={() => {
      setFrom('');
      setTo('');
      onFilter('', '');
      
      }
      }
      className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-400 col-span-2 cursor-pointer"
>
  Clear
</button>

    </div>
  );
};

export default DateFilter;