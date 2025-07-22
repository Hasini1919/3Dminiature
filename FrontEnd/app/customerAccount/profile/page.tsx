
"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/customer-account/Sidebar";
import { ProfileCard } from "@/components/customer-account/ProfileCard";
import { AddressData } from "@/components/customer-account/AddressFields";
import { EditProfileForm } from "@/components/customer-account/EditProfileForm";
import { EditAddressForm } from "@/components/customer-account/EditAddressForm";
import AddressCard from "@/components/customer-account/AddressCard";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import {
  getProfile,
  updateProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/utils/profileApi";

interface UserData {
  name: string;
  email: string;
  mobile?: string;
  birthday?: string;
  gender?: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData>({ name: "", email: "" });
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editAddressMode, setEditAddressMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<AddressData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const transformAddressData = (addr: Partial<AddressData>): AddressData => ({
    firstName: addr.firstName || "",
    lastName: addr.lastName || "",
    province: addr.province || "",
    district: addr.district || "",
    city: addr.city || "",
    area: addr.area || "",
    houseNo: addr.houseNo || "",
    postalCode: addr.postalCode || "",
    country: addr.country || "United States",
    anyInformation: addr.anyInformation || "",
    _id: addr._id,
    isDefault: addr.isDefault || false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [profileRes, addressRes] = await Promise.all([
          getProfile(),
          getAddresses(),
        ]);

        setUserData({
           name: profileRes?.name || "",
          email: profileRes?.email || "",
  mobile: profileRes?.mobile,
  birthday: profileRes?.birthday,
  gender: profileRes?.gender,
        });

        const normalized = (Array.isArray(addressRes) ? addressRes : []).map(
          transformAddressData
        );

        setAddresses(normalized);
      } catch (err: any) {
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSaveProfile = async (updatedData: UserData) => {
    try {
      setSaving(true);
      const res = await updateProfile(updatedData);
      if (res) {
  setUserData({
    name: res.name || "",
    email: res.email || "",
    mobile: res.mobile,
    birthday: res.birthday,
    gender: res.gender,
  });
}

    } catch (err: any) {
      setError(err.message || "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAddress = async (address: AddressData) => {
  try {
    setSaving(true);
    let updated: { success: boolean; address: AddressData };

    if (address._id) {
      updated = await updateAddress(address._id, address);
      setAddresses(addresses.map((a) =>
        a._id === address._id ? transformAddressData(updated.address) : a
      ));
    } else {
      updated = await addAddress(address);
      setAddresses([...addresses, transformAddressData(updated.address)]);
    }

    setEditAddressMode(false);
    setCurrentAddress(null);
  } catch (err: any) {
    setError(err.message || "Error saving address");
  } finally {
    setSaving(false);
  }
};

  const handleDeleteAddress = async (id: string) => {
    try {
      setSaving(true);
      await deleteAddress(id);
      setAddresses(addresses.filter((a) => a._id !== id));
    } catch (err: any) {
      setError(err.message || "Error deleting address");
    } finally {
      setSaving(false);
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    try {
      setSaving(true);
      await setDefaultAddress(id);
      setAddresses(
        addresses.map((a) => ({ ...a, isDefault: a._id === id }))
      );
    } catch (err: any) {
      setError(err.message || "Error setting default");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-red-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <span className="text-red-700 dark:text-red-400">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            {editMode ? (
              <EditProfileForm
                userData={userData}
                onCancel={() => setEditMode(false)}
                onSave={handleSaveProfile}
                saving={saving}
              />
            ) : (
              <ProfileCard userData={userData} onEdit={() => setEditMode(true)} />
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 lg:p-8">
            <h2 className="text-xl font-semibold mb-6">Address Book</h2>

            {editAddressMode ? (
              <EditAddressForm
                addressData={
                  currentAddress || {
                    firstName: "",
                    lastName: "",
                    province: "",
                    district: "",
                    city: "",
                    area: "",
                    houseNo: "",
                    postalCode: "",
                    country: "United States",
                    anyInformation: "",
                  }
                }
                onCancel={() => {
                  setEditAddressMode(false);
                  setCurrentAddress(null);
                }}
                onSave={handleSaveAddress}
                saving={saving}
              />
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setCurrentAddress(null);
                    setEditAddressMode(true);
                  }}
                  className="btn btn-primary"
                >
                  Add New Address
                </button>

                {addresses.map((address) => (
                  <AddressCard
                    key={address._id || Math.random().toString(36)}
                    addressData={address}
                    onEdit={() => {
                      setCurrentAddress(address);
                      setEditAddressMode(true);
                    }}
                    onDelete={() => {
                      if (address._id) handleDeleteAddress(address._id);
                    }}
                    onSetDefault={() => {
                      if (address._id) handleSetDefaultAddress(address._id);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}