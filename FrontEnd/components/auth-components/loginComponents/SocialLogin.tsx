import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {

  const GOOGLE_AUTH_URL = "http://localhost:5500/auth/google";

  return (
    <div className="flex flex-col space-y-4">
      
      <button
        className="flex items-center justify-center space-x-3 rounded-lg px-4 py-2 text-white w-full"
        style={{ backgroundColor: "#1877F2" }}
        disabled
      >
        <FaFacebook size={20} />
        <span>Continue with Facebook</span>
      </button>

     
      <button
        className="flex items-center justify-center space-x-3 rounded-lg px-4 py-2 text-white w-full"
        style={{
          background:
            "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        }}
        disabled
      >
        <FaInstagram size={20} />
        <span>Continue with Instagram</span>
      </button>

      
      <button
        onClick={() => {
          window.location.href = GOOGLE_AUTH_URL;
        }}
        className="flex items-center justify-center space-x-3 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full hover:shadow-md transition"
      >
        <FcGoogle size={20} />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
