const API_URL = 'http://localhost:5500/api';

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
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch profile');
    }

    return data; // ✅ Now returns direct customer object
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error;
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
}): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }

    return data;
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
};

// ======================
// Address API Utilities
// ======================

/**
 * Get all user addresses
 */
export const getAddresses = async (): Promise<Array<{
  _id: string;
  firstName: string;
  lastName: string;
  province: string;
  // ... other address fields
}>> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/profile/addresses`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch addresses');
    }

    return data;
  } catch (error) {
    console.error('Address fetch error:', error);
    throw error;
  }
};

/**
 * Add new address
 */
export const addAddress = async (addressData: {
  firstName: string;
  lastName: string;
  province: string;
  district: string;
  city: string;
  area: string;
  houseNo: string;
  postalCode: string;
  isDefault?: boolean;
}): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/profile/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(addressData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to add address');
    }

    return data;
  } catch (error) {
    console.error('Address add error:', error);
    throw error;
  }
};

/**
 * Update existing address
 */
export const updateAddress = async (
  addressId: string,
  addressData: {
    firstName?: string;
    lastName?: string;
    // ... other updatable fields
    isDefault?: boolean;
  }
): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/profile/addresses/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(addressData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update address');
    }

    return data;
  } catch (error) {
    console.error('Address update error:', error);
    throw error;
  }
};

/**
 * Delete address
 */
export const deleteAddress = async (addressId: string): Promise<{ success: boolean }> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/profile/addresses/${addressId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete address');
    }

    return data;
  } catch (error) {
    console.error('Address delete error:', error);
    throw error;
  }
};

/**
 * Set default address
 */
export const setDefaultAddress = async (addressId: string): Promise<any> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/profile/addresses/default/${addressId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to set default address');
    }

    return data;
  } catch (error) {
    console.error('Default address set error:', error);
    throw error;
  }
};