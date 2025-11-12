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

// File Upload
export const fileUpload = async (formData) => {
  const res = await axiosInstance.post(API_ROUTES.FILEUPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// Delete upload
export const deleteCategory = async(id) => {
  const res = await axiosInstance.delete(`${API_ROUTES.DELETECATEGORY}/${id}`)
  return res.data;
}

// Edit category
export const updateCategory = async(id , formData) => {
  const res = await axiosInstance.put(`${API_ROUTES.UPDATECATEGORY}/${id}` , formData);
  return res.data;
} 

// View Category
export const viewCategory = async(id) => {
  const res = await axiosInstance.get(`${API_ROUTES.VIEWCATEGORY}/${id}`);
  return res.data;
}

// Category Dropdown
export const categoryDropdown = async() => {
  const res = await axiosInstance.get(API_ROUTES.CATEGORYDROPDOWN);
  return res.data;
}