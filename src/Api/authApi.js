import { API_ROUTES } from "./ApiRoutes";
import axiosInstance from "./axiosInstance";

export const loginUser = async (payload) => {
  const response = await axiosInstance.post(API_ROUTES.LOGIN, payload);
  return response.data;
};
