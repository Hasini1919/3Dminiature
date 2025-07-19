const API_URL = 'http://localhost:5500/api';

// ======================
// Token Management Utilities
// ======================
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const clearAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// ======================
// Authentication API Calls
// ======================
export const signup = async (
  name: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<{ token: string; user?: any }> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      let errorMessage = 'Login failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (error) {
        console.error('Error parsing response JSON:', error);
      }
      console.log(errorMessage);
      throw new Error(errorMessage);
      
      
    }

    const data = await response.json();
    
    if (!data.token) {
      throw new Error('Login failed: No token received');
    }

    setAuthToken(data.token);
    return data;
  } catch (error: any) {
    console.error('Login error:', error.message || 'Unknown error');
    throw new Error(error.message || 'Login failed');
  }
};

export const forgotPassword = async (email: string): Promise<any> => {
  try {
    console.log('Sending forgot password request for email:', email);
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    console.log('Forgot password response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Error sending reset email');
    }

    return data;
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<any> => {
  try {
    console.log('Sending reset password request');
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });

    const data = await response.json();
    console.log('Reset password response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Error resetting password');
    }

    return data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};



export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const user = await response.json();
   

    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// ======================
// Social Login Utilities
// ======================


export const initiateFacebookLogin = (): void => {
  window.location.href = `${API_URL}/auth/facebook`;
};

export const handleSocialLoginCallback = (): { token: string | null } => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  
  if (token) {
    setAuthToken(token);
    return { token };
  }
  
  return { token: null };
};