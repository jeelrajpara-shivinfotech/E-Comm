import { API_ROUTES } from "./ApiRoutes"
import axiosInstance from "./axiosInstance"

export const getDashboardStats = async () => {
    const response = await axiosInstance.get(API_ROUTES.DASHBOARDSTATS)
    return response.data
}

// Highest purchase order
export const getHighestPurchaseOrder = async () => {
    const response = await axiosInstance.get(API_ROUTES.HIGHESTPURCHASEORDERS)
    return response.data
}

// Order Pie-chart data
export const getOrderStatusCount = async (timeFrame) => {
    const response = await axiosInstance.post(API_ROUTES.ORDERSTATUSCOUNT, timeFrame);
    return response.data;
}

// Users report 
export const getUserReport = async (payload) => {
    const response = await axiosInstance.post(API_ROUTES.USERREPORT , payload);
    return response.data;
}

// Order report
export const getOrderReport = async (payload) => {
    const response = await axiosInstance.post(API_ROUTES.ORDERREPORT , payload);
    return response.data;
}