import { API_ROUTES } from "./apiRoute"
import axiosInstance from "./axiosInstance"

// List of products
export const productListing = async (payload) => {
    const response = await axiosInstance.post(API_ROUTES.LISTOFPRODUCT, payload);
    return response.data;
}

// View products
export const viewProduct = async(id) => {
  const res = await axiosInstance.get(`${API_ROUTES.VIEWPRODUCT}/${id}`);
  return res.data;
}

// Delete products
export const deleteProduct = async(id) => {
  const res = await axiosInstance.delete(`${API_ROUTES.DELETEPRODUCT}/${id}`);
  return res.data;
}

// Edit products
export const updateProducts = async(id , payload) => {
  const res = await axiosInstance.put(`${API_ROUTES.EDITPRODUCT}/${id}` , payload);
  return res.data;
} 

// Add products
export const addProduct = async (payload) => {
  const response = await axiosInstance.post(API_ROUTES.ADDPRODUCT, payload);
  return response.data;
};
