"use client";

import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";

interface AddressData {
  _id?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  province: string;
  district: string;
  area: string;
  city: string;
  houseNo: string;
  postalCode?: string;
  isDefault?: boolean;
  anyInformation?: string;
  country?: string;
}

interface AddressCardProps {
  addressData: AddressData;
  onEdit: () => void;
  onDelete: (id: string) => Promise<void>;
  onSetDefault: (id: string) => Promise<void>; 
}

export default function AddressCard({
  addressData,
  onEdit,
  onDelete,
  onSetDefault,
}: 
AddressCardProps) {
 const hasAddress = Object.values(addressData).some(
   (val) => typeof val === "string" && val.trim() !== ""
 );

  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingDefault, setLoadingDefault] = useState(false);

  const handleDelete = async () => {
    if (!addressData._id) {
      toast.error("Invalid address ID");
      return;
    }
    setLoadingDelete(true);
    try {
      await onDelete(addressData._id);
      toast.success("Address deleted successfully");
    } catch (error) {
      toast.error("Failed to delete address");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleSetDefault = async () => {
    if (!addressData._id) {
      toast.error("Invalid address ID");
      return;
    }

    setLoadingDefault(true);
    try {
      await onSetDefault(addressData._id); // Passing just the ID string
    } catch (error) {
      toast.error("Failed to set default address");
    } finally {
      setLoadingDefault(false);
    }
  };

  return (
    <div className="space-y-4 border p-4 rounded-lg">
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
            <p className="font-medium">{addressData.postalCode || "-"}</p>
          </div>
          {addressData.isDefault && (
            <div className="col-span-full">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Default Address
              </span>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No address saved yet</p>
      )}

      <div className="flex gap-2">
        <button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
          onClick={onEdit}
          disabled={loadingDelete || loadingDefault}
        >
          <FaEdit />
          {hasAddress ? "Edit Address" : "Add Address"}
        </button>

        {hasAddress && (
          <>
            <button
              onClick={handleDelete}
              disabled={loadingDelete || loadingDefault}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md"
            >
              {loadingDelete ? "Deleting..." : "Delete"}
            </button>

            {!addressData.isDefault && (
              <button
                onClick={handleSetDefault}
                disabled={loadingDefault || loadingDelete}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
              >
                {loadingDefault ? "Setting..." : "Set Default"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}