import { API_ROUTES } from "./ApiRoutes";
import axiosInstance from "./axiosInstance";
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.LOGIN, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};