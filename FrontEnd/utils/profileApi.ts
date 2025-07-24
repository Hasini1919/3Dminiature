import axiosInstance from "@/services/api";
import { getAuthToken } from "@/utils/auth-utils/api";
const token = getAuthToken();
console.log("Token:", token);
// ======================
// Profile API Utilities
// ======================

/**
 * Get complete user profile with addresses
 */
export const getProfile = async (): Promise<{
  _id: string;
  userId: string;
  email: string;
  name?: string;
  mobile?: string;
  birthday?: string;
  gender?: string;
  profileComplete?: boolean;
  defaultShippingAddress?: any;
  addresses?: Array<any>;
}> => {
  try {
    const response = await axiosInstance.get("/api/profile");
    return response.data;
  } catch (error: any) {
  console.error("Profile fetch error:", {
    message: error.message,
    status: error.response?.status,
    data: error.response?.data,
  });
  throw new Error(error.response?.data?.message || "Failed to fetch profile");
}
};

/**
 * Update user profile
 */
export const updateProfile = async (profileData: {
  name: string;
  mobile?: string;
  birthday?: string;
  gender?: string;
  addresses?: Array<any>;
}): Promise<any> => {
  try {
    const response = await axiosInstance.put("/api/profile", profileData);
    return response.data;
  } catch (error: any) {
    console.error("Profile update error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};

// ======================
// Address API Utilities
// ======================

/**
 * Get all user addresses
 */
export const getAddresses = async (): Promise<
  Array<{
    _id?: string;
    firstName: string;
    lastName: string;
    province: string;
    district: string;
    city: string;
    area: string;
    houseNo: string;
    postalCode: string;
    country: string;
    anyInformation?: string;
    isDefault?: boolean;
  }>
> => {
  try {
    const response = await axiosInstance.get("/api/profile/addresses");
    return response.data;
  } catch (error: any) {
    console.error("Address fetch error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch addresses"
    );
  }
};

/**
 * Add new address
 */
export const addAddress = async (addressData: {
  _id?: string;
  firstName: string;
  lastName: string;
  province: string;
  district: string;
  city: string;
  area: string;
  houseNo: string;
  postalCode: string;
  country: string;
  anyInformation?: string;
  isDefault?: boolean;
}): Promise<any> => {
  try {
    console.log("Sending address data:", addressData);
    const response = await axiosInstance.post(
      "/api/profile/addresses",
      addressData,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json", 
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Address add error:", error);
    throw new Error(error.response?.data?.message || "Failed to add address");
  }
};

/**
 * Update existing address
 */
export const updateAddress = async (
  addressId: string,
  addressData: {
    _id?: string;
    firstName: string;
    lastName: string;
    province: string;
    district: string;
    city: string;
    area: string;
    houseNo: string;
    postalCode: string;
    country: string;
    anyInformation?: string;
    isDefault?: boolean;
  }
): Promise<any> => {
  try {
    const response = await axiosInstance.put(
      `/api/profile/addresses/${addressId}`,
      addressData
    );
    return response.data;
  } catch (error: any) {
    console.error("Address update error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to update address"
    );
  }
};

/**
 * Delete address
 */
export const deleteAddress = async (
  addressId: string
): Promise<{ success: boolean }> => {
  try {
    const response = await axiosInstance.delete(
      `/api/profile/addresses/${addressId}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Address delete error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to delete address"
    );
  }
};

/**
 * Set default address
 */
export const setDefaultAddress = async (addressId: string): Promise<any> => {
  try {
    const response = await axiosInstance.put(
      `/api/profile/addresses/default/${addressId}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Default address set error:", error);
    throw new Error(
      error.response?.data?.message || "Failed to set default address"
    );
  }
};