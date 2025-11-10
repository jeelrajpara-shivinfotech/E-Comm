import { API_ROUTES } from "./apiRoute"
import axiosInstance from "./axiosInstance"

// List of categories
export const getListOfCategory = async (payload) => {
    const response = await axiosInstance.post(API_ROUTES.LISTOFCATEGORY , payload);
    return response.data
}

// Create Category
export const createCategory = async (formData) => {
  const response = await axiosInstance.post(API_ROUTES.CREATECATEGORY, formData);
  return response.data;
};
