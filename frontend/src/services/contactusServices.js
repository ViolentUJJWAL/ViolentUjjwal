import { toast } from "react-toastify";
import api from "./api"; // Assuming api.js is in the same folder
import { userServices } from "./userServices ";

export const contactServices = {
  getContacts: async () => {
    return toast.promise(
      api.get("/contact-us").then((response) => response.data),
      {
        pending: "Fetching contacts...",
        success: "Contacts fetched successfully!",
        error: {
          render({ data }) {
            return data.response?.data?.message || "Failed to fetch contacts";
          },
        },
      }
    );
  },

  addContact: async (contactData) => {
    return toast.promise(
      api.post("/contact-us", contactData).then((response) => response.data),
      {
        pending: "Request sending...",
        success: "Thank you for contacting us.",
        error: {
          render({ data }) {
            return data.response?.data?.message || "Failed to contact";
          },
        },
      }
    );
  },

  updateResponse: async (id, responseMessage) => {
    return toast.promise(
      api
        .patch(`/contact-us/${id}/response`, { response: responseMessage })
        .then(async(response) => {
          console.log("get admin data")
          const res = await userServices.getAllDataForAdmin()
          console.log("get admin data", res)
          return res
        }),
      {
        pending: "Updating response...",
        success: "Response updated successfully!",
        error: {
          render({ data }) {
            return data.response?.data?.message || "Failed to update response";
          },
        },
      }
    );
  },

  deleteContact: async (id) => {
    return toast.promise(
      api.delete(`/contact-us/${id}`).then(async(response) => {
        console.log("get admin data")
          const res = await userServices.getAllDataForAdmin()
          console.log("get admin data", res)
          return res
      }),
      {
        pending: "Deleting contact...",
        success: "Contact deleted successfully!",
        error: {
          render({ data }) {
            return data.response?.data?.message || "Failed to delete contact";
          },
        },
      }
    );
  },
};
