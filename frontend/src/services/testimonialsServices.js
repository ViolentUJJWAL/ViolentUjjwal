import api from "./api";
import { toast } from "react-toastify";
import { userServices } from "./userServices ";

// Add a testimonial
export const addTestimonial = async (testimonialData) => {
  return toast.promise(
    api.post("/testimonial", testimonialData),
    {
      pending: "Adding your testimonial...",
      success: "Testimonial added request sended!",
      error: "Failed to add testimonial. Please try again.",
    }
  );
};

// Verify a testimonial
export const verifyTestimonial = async (id) => {
  return toast.promise(
    api.patch(`/testimonial/${id}/verify`).then(async(response) => {
      console.log("get admin data")
        const res = await userServices.getAllDataForAdmin()
        console.log("get admin data", res)
        return res
    }),
    {
      pending: "Verifying testimonial...",
      success: "Testimonial verified successfully!",
      error: "Failed to verify testimonial. Please try again.",
    }
  );
};

// Delete a testimonial
export const deleteTestimonial = async (id) => {
  return toast.promise(
    api.delete(`/testimonial/${id}`).then(async(response) => {
      console.log("get admin data")
        const res = await userServices.getAllDataForAdmin()
        console.log("get admin data", res)
        return res
    }),
    {
      pending: "Deleting testimonial...",
      success: "Testimonial deleted successfully!",
      error: "Failed to delete testimonial. Please try again.",
    }
  );
};
