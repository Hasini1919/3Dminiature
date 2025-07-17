'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DateFilter from './date-filter';

interface ManubarProps {
  onFilter: (from: string, to: string) => void;
}

const Manubar: React.FC<ManubarProps> = ({ onFilter }) =>{
  const pathname = usePathname()

  const links = [
    { href: '/my-account/orders', label: 'All Orders' },
    { href: '/my-account/orders/pending', label: 'Pending' },
    { href: '/my-account/orders/shipped', label: 'Shipped' },
    { href: '/my-account/orders/cancelled', label: 'Cancelled' },
  ]

  return (
    <nav className="grid grid-cols-12  text-center h-full items-center border-b-2 border-red-500">
      {links.map((link, index) => {
       const isActive = pathname === link.href

        return (
          <div key={index} className="col-span-1">
            <Link
              href={link.href}
              className={` ${
                isActive
                  ? 'text-red-600 border-b-2 border-red-600 font-semibold'
                  : 'text-gray-700 hover:text-red-600'
              }`}
            >
              {link.label}
            </Link>
          </div>
        )
      })}
      <div className='col-span-2'></div>
      <div className="col-span-6">
      <DateFilter onFilter={onFilter} />
      </div>
    </nav>
  )
}

export default Manubar;