import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  return config;
});

const sendNotification = (statusCode: number) => {
  if (window.location.pathname !== "/auth") {
    switch (statusCode) {
      case 201:
        toast.success("Data saved successfully", { icon: FaCheckCircle });
        break;
      case 204:
        toast.success("Data updated successfully", { icon: FaCheckCircle });
        break;
      case 404:
        toast.error("Data not found");
        break;
      case 401:
        toast.error("Unauthorized");
        window.location.href = "/auth";
        localStorage.clear();
        break;
      case 403:
        toast.error("Forbidden");
        break;

      case 500:
        toast.error("Server error");
        break;
      default:
        break;
    }
  }
};

api.interceptors.response.use(
  (response) => {
    sendNotification(response.status);
    return response;
  },
  (error) => {
    sendNotification(error.response.status);
    return Promise.reject(error);
  }
);
