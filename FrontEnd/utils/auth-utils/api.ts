
const API_URL = 'http://localhost:5008/api';

export const signup = async (name: string, email: string, password: string) => {
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
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let errorMessage = "Login failed";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (error) {
        console.error("Error parsing response JSON:", error);
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data.token) {
      throw new Error("Login failed: No token received");
    }
    localStorage.setItem("token", data.token);

    return data;
  } catch (error: any) {
    console.error("Login error:", error.message || "Unknown error");
    throw new Error(error.message || "Login failed");
  }
};

export const forgotPassword = async (email: string) => {
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

export const resetPassword = async (token: string, password: string) => {
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
