import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API } from "../../config/config";
import { useNavigate } from "react-router-dom";

export default function GoogleAuthSection({
  onLoginSuccess,
  role,
  setSuccessMessage,
  setShowLoginModal,
  onClose,
}) {
  const navigate = useNavigate();
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      if (!credential) {
        console.error("No credential received");
        return;
      }

      // Optional: decode the token locally
      const userInfo = jwtDecode(credential);
      console.log("Decoded Google user:", userInfo);

      // Send to your backend
      const res = await axios.post(
        `${API}/user/googleauth`,
        { credential },
        { withCredentials: true }
      );

      console.log("Backend Response:", res.data);

      const data = res.data;

      if (data && data.token) {
        const userData = data.user || data.business || {};

        localStorage.setItem(
          role === "business" ? "businessData" : "userData",
          JSON.stringify({
            user_id: userData.id || userData._id,
            name: userData.name || "",
            email: userData.email || "",
            avatarUrl: userData.avatarUrl || "",
          })
        );
        setSuccessMessage("Login successful!");

        setTimeout(() => {
          if (setShowLoginModal) {
            setShowLoginModal(false);
          }
          onClose();
          window.location.href = "/";

          if (role === "business") {
            //const userId = userData.id || userData._id;
            //navigate(`/vendorpanel`);
          }
        }, 1000);
      } else {
        throw new Error("Invalid response format");
      }
      if (res.data?.user) {
        onLoginSuccess?.(res.data.user); // callback to parent component
      }
    } catch (error) {
      console.error(
        "Google Login Failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      {/* OR Divider */}
      <div className="flex items-center justify-center text-center gap-3 my-2">
        <div className="flex-1 h-px bg-gray-400" />
        <p className="text-md text-gray-500 px-3 bg-white">or</p>
        <div className="flex-1 h-px bg-gray-400" />
      </div>

      {/* Google Login Button */}
      <div className="mt-2">
        <div className="relative group cursor-pointer overflow-hidden rounded-lg">
          <div className="rounded-lg p-0.5 transition duration-300 group-hover:border-gray-400">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.log("Login Failed")}
              useOneTap
              theme="outline"
              size="large"
              shape="rectangular"
              text="signin_with"
              locale="en"
              width="100%"
              containerProps={{
                className:
                  "flex items-center justify-center w-full py-2.5 px-4",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
