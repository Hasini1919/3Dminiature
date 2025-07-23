import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  id: string;
}

export const getUserIdFromToken = (): string | null => {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.id;
  } catch (err) {
    console.error("Invalid JWT token:", err);
    return null;
  }
};

//logout function below
export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
};