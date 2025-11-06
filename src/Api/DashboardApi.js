import { API_ROUTES } from "./apiRoutes"
import axiosInstance from "./axiosInstance"

export const getDashboardStats = async () => {
    const response = await axiosInstance.get(API_ROUTES.DASHBOARD_STATS)
    return response.data
}

export const getHighestPurchaseOrder = async () => {
    const response = await axiosInstance.get(API_ROUTES.HIGHEST_PURCHASE_ORDERS)
    return response.data
}

export const getOrderStatusCount = async (timeFrame) => {
    const response = await axiosInstance.post(API_ROUTES.ORDER_STATUS_COUNT, timeFrame);
    return response.data;
}

export const getUserReport = async (payload) => {
    const response = await axiosInstance.post(API_ROUTES.USER_REPORT , payload);
    return response.data;
}

export const getOrderReport = async (payload) => {
    const response = await axiosInstance.post(API_ROUTES.ORDER_REPORT , payload);
    return response.data;
}