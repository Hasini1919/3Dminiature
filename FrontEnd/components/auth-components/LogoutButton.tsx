"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/utils/auth";
import { toast } from "react-hot-toast";
// import { useUserContext } from "@/context/UserContext"; // if you're using one

const LogoutButton = () => {
  const router = useRouter();
  // const { setUser } = useUserContext(); // optional context clearing

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    logout();
    // setUser(null); // optional: clear context
    toast.success("✅ Logged out successfully!");
    router.push("/authentication/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
