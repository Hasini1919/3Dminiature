"use client";

import { AddressData } from "./AddressFields";
import { FaEdit } from "react-icons/fa";

interface AddressCardProps {
  addressData: AddressData;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

export default function AddressCard({ 
  addressData, 
  onEdit, 
  onDelete, 
  onSetDefault 
}: AddressCardProps) {
  const hasAddress = Object.values(addressData).some(val => val.trim() !== "");

  return (
    <div className="space-y-4">
      {hasAddress ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">
              {addressData.firstName} {addressData.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">
              {addressData.houseNo}, {addressData.area}, {addressData.city}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Province/District</p>
            <p className="font-medium">
              {addressData.province}, {addressData.district}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Postal Code</p>
            <p className="font-medium">{addressData.postalCode}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No address saved yet</p>
      )}

      <div className="flex gap-2">
        <button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
          onClick={onEdit}
        >
          <FaEdit /> {hasAddress ? "Edit Address" : "Add Address"}
        </button>
        
        {hasAddress && (
          <>
            <button 
              onClick={onDelete}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md"
            >
              Delete
            </button>
            {!addressData.isDefault && (
              <button 
                onClick={onSetDefault}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
              >
                Set Default
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}