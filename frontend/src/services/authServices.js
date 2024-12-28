import { toast } from "react-toastify";
import api from "./api"; // Assuming api.js is in the same folder

export const authServices = {
  sendOtp: async (password) => {
    return toast.promise(
      api.post("/auth/login/send-otp", { password }).then((response) => response.data),
      {
        pending: "Sending OTP...",
        success: "OTP sent successfully!",
        error: {
          render({ data }) {
            return data.response?.data?.message || "Failed to send OTP";
          },
        },
      }
    );
  },

  verifyOtp: async (otp) => {
    return toast.promise(
      api.post("/auth/login/verify-otp", { otp }).then((response) => response.data),
      {
        pending: "Verifying OTP...",
        success: "Login successfully!",
        error: {
          render({ data }) {
            return data.response?.data?.message || "Failed to verify OTP";
          },
        },
      }
    );
  },

  logout: async () => {
    return toast.promise(
      api.get("/auth/logout").then((response) => response.data),
      {
        pending: "Logging out...",
        success: "Logged out successfully!",
        error: {
          render({ data }) {
            return data.response?.data?.message || "Failed to logout";
          },
        },
      }
    );
  },
};
