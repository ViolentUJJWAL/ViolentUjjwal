import api from "./api";
import { toast } from "react-toastify";
import { userServices } from "./userServices ";

export const dataService = {
    // Add new data (project, experience, or skill)
    add: async (type, formData) => {
        console.log(formData)
        return toast.promise(api.post(`/data/${type}`, formData).then(async (response) => {
            console.log("get admin data")
            const res = await userServices.getAllDataForAdmin()
            console.log("get admin data", res)
            return res
        }),
            {
                pending: `Adding new ${type}...`,
                success: `New ${type} added successfully!`,
                error: {
                    render({ data }) {
                        return data?.response?.data?.message || `Failed to add ${type}`;
                    }
                }
            }
        );
    },

    // Update existing data
    update: async (type, id, formData) => {
        return toast.promise(api.put(`/data/${type}/${id}`, formData).then(async (response) => {
            console.log("get admin data")
            const res = await userServices.getAllDataForAdmin()
            console.log("get admin data", res)
            return res
        }),
            {
                pending: "Updating item...",
                success: `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`,
                error: {
                    render({ data }) {
                        return data?.response?.data?.message || `Failed to update ${type}`;
                    }
                }
            }
        );
    },

    // Delete data
    delete: async (type, id) => {
        return toast.promise(api.delete(`/data/${type}/${id}`).then(async (response) => {
            console.log("get admin data")
            const res = await userServices.getAllDataForAdmin()
            console.log("get admin data", res)
            return res
        }),
            {
                pending: "Deleting item...",
                success: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`,
                error: {
                    render({ data }) {
                        return data?.response?.data?.message || `Failed to delete ${type}`;
                    }
                }
            }
        );
    }
};