import { Formik, Form } from "formik";
import * as Yup from "yup";
import BaseInput from "../BaseComponents/BaseInput";
import { createCategory, fileUpload } from "../../Api/categoryApis";
import axiosInstance from "../../Api/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";
import { createCategoryConstants, createCategoryLabel, createCategoryPlaceholder } from "../../common/constants/categoryConstants";
import BaseButton from "../BaseComponents/BaseButton";
import { errorMessages } from "../../common/validation";

const validationSchema = Yup.object({
    [createCategoryConstants.categoryName]: Yup.string()
        .required(errorMessages.Required(createCategoryLabel.categoryLabelName)), 

    [createCategoryConstants.categoryDescription]: Yup.string()
        .required(errorMessages.Required(createCategoryLabel.categoryLabelDesc)), 

    [createCategoryConstants.categoryImage]: Yup.mixed()
        .test(
            "fileSize",
            errorMessages.CategoryImage, 
            (value) => !value || (value && value.size <= 1024 * 1024) // <= 1 MB
        ),
});

function AddCategoryForm({ onClose }) {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("files", file);

        const response = await fileUpload(formData);
        console.log(response);
        return response?.data?.[0];
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
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Formik
            initialValues={{
                [createCategoryConstants.categoryName]: "",
                [createCategoryConstants.categoryDescription]: "",
                [createCategoryConstants.categoryImage]: null,
            }}

            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values }) => (
                <Form className="flex flex-col gap-4">
                    <BaseInput
                        id={createCategoryConstants.categoryName}
                        name={createCategoryConstants.categoryName}
                        label={createCategoryLabel.categoryLabelName}
                        placeholder={createCategoryPlaceholder.categoryNamePlaceholder}
                        required
                    />

                    <BaseInput
                        id={createCategoryConstants.categoryDescription}
                        name={createCategoryConstants.categoryDescription}
                        label={createCategoryLabel.categoryLabelDesc}
                        placeholder={createCategoryPlaceholder.categoryDescPlaceholder}
                        required
                    />

                    <BaseInput
                        id={createCategoryConstants.categoryImage}
                        name={createCategoryConstants.categoryImage}
                        type={createCategoryConstants.file}
                        label={createCategoryLabel.categoryLabelImage}
                        setFieldValue={setFieldValue}
                        setPreview={setPreview}
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-24 h-24 rounded-lg object-cover border"
                        />
                    )}

                    <div className="flex justify-end gap-2">
                        <BaseButton
                            type="button"
                            className="border border-gray-300 bg-white rounded-md"
                            textColor="black"
                            onClick={onClose}
                            icon={false}>
                            {createCategoryConstants.cancelButton}
                        </BaseButton>

                        <BaseButton
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            icon={false}>
                            {loading ? createCategoryConstants.savingText : createCategoryConstants.save}
                        </BaseButton>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default AddCategoryForm;
