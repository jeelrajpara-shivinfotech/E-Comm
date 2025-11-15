import { API_ROUTES } from "./apiRoute"
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
