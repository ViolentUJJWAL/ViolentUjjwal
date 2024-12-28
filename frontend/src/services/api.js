import axios from "axios";

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: "https://violentujjwal.onrender.com" || "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== "/admin-login" && window.location.pathname !== "/") {
        window.location.href = "/admin-login";
      }
    }
    return Promise.reject(error);
  }
);
export default api;
