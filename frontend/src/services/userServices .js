import { toast } from "react-toastify";
import api from "./api"; // Assuming api.js is in the same folder

export const userServices = {

    getAllDataForUser: async () => {
        try {
            const response = await api.get("/user/user");
            return response.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Failed to fetch user data"
            );
        }
    },

    getAllDataForAdmin: async () => {
        try {
            const response = await api.get("/user/admin");
            return response.data;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || "Failed to fetch admin data"
            );
        }
    },

    updateUser: async (updates) => {
        return toast.promise(
            api.put(`/user`, updates).then(async(response) => {
                const res = await api.get("/user/admin")
                return res.data;
            }),
            {
                pending: "Updating user details...",
                success: "User details updated successfully!",
                error: {
                    render({ data }) {
                        return data.response?.data?.message || "Failed to update user details";
                    },
                },
            }
        );
    },

    updatePassword: async (oldPassword, newPassword) => {
        return toast.promise(
            api.put(`/user/password`, { oldPassword, newPassword }).then((response) => response.data),
            {
                pending: "Updating password...",
                success: "Password updated successfully!",
                error: {
                    render({ data }) {
                        return data.response?.data?.message || "Failed to update password";
                    },
                },
            }
        );
    },
};
