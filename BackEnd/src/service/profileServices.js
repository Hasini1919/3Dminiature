import axios from 'axios';

const API_URL =  'http://localhost:5500/api';

// Create axios instance with base configuration
const profileService = axios.create({
  baseURL: `${API_URL}/profile`,
  timeout: 60000, 
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to inject token
profileService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for error handling
profileService.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Profile service request failed';
    console.error('Profile Service Error:', errorMessage);
    throw new Error(errorMessage);
  }
);

// Profile Services
export const getProfile = async () => {
  return profileService.get('/');
};

export const updateProfile = async (profileData) => {
  return profileService.put('/', profileData);
};

// Address Services
export const getAddresses = async () => {
  return profileService.get('/addresses');
};

export const addAddress = async (addressData) => {
  return profileService.post('/addresses', addressData);
};

export const updateAddress = async (addressId, addressData) => {
  return profileService.put(`/addresses/${addressId}`, addressData);
};

export const deleteAddress = async (addressId) => {
  return profileService.delete(`/addresses/${addressId}`);
};

export default profileService;