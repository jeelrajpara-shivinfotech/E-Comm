import { API_ROUTES } from "./apiRoute";
import axiosInstance from "./axiosInstance";

export const getUserReport = async (payload) => {
    const response = await axiosInstance.post(API_ROUTES.USER_REPORT , payload);
    return response.data;
}

export const getOrderReport = async (payload) => {
    const response = await axiosInstance.post(API_ROUTES.ORDER_REPORT , payload);
    return response.data;
}