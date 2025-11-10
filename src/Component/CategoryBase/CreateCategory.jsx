import { Formik, Form } from "formik";
import * as Yup from "yup";
import BaseInput from "../BaseComponents/BaseInput";
import { createCategory } from "../../Api/categoryApis";
import axiosInstance from "../../Api/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
    category_name: Yup.string().required("Category name is required"),
    category_description: Yup.string().required("Description is required"),
});

function AddCategoryForm({ onClose }) {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null); // preview image

    const uploadImage = async (files) => {
        const formData = new FormData();
        formData.append("file", files);
        const res = await axiosInstance.post("/fileUpload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(res.data)
        return res.data?.data?.[0];
    };

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            let imageName = await uploadImage(values.category_image)

            const payload = {
                category_name: values.category_name,
                description: values.category_description,
                category_image: imageName,
            };

            const res = await createCategory(payload);

            toast.success(res?.message);
            resetForm();
            onClose?.();
        } catch (error) {
            console.error("Error creating category:", error);
            toast.error(error?.response?.data?.message || "Error creating category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Formik
            initialValues={{
                category_name: "",
                category_description: "",
                category_image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values }) => (
                <Form className="flex flex-col gap-4">
                    <BaseInput
                        id="category_name"
                        name="category_name"
                        label="Category Name"
                        placeholder="Enter category name"
                        required
                    />

                    <BaseInput
                        id="category_description"
                        name="category_description"
                        label="Description"
                        placeholder="Enter category description"
                        required
                    />

                    <div>
                        <label className="block text-sm mb-1.5 font-medium text-gray-600 leading-5 inter">
                            Category Image
                        </label>
                        <input
                            type="file"
                            name="category_image"
                            accept=".jpg,.png,.jpeg,.webp"
                            onChange={(e) => {
                                const file = e.currentTarget.files[0];
                                setFieldValue("category_image", file);
                                if (file) {
                                    setPreview(URL.createObjectURL(file));
                                }
                            }}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-black"
                        />
                    </div>

                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-24 h-24 rounded-lg object-cover border"
                        />
                    )}

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 ${loading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default AddCategoryForm;
