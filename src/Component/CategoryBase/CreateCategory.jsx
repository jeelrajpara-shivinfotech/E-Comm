import { Formik, Form } from "formik";
import * as Yup from "yup";
import BaseInput from "../BaseComponents/BaseInput";
import { createCategory, fileUpload, updateCategory } from "../../Api/categoryApis";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createCategoryConstants,
  createCategoryLabel,
  createCategoryPlaceholder,
} from "../../common/constants/categoryConstants";
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
      (value) =>
        !value || (value && value.size <= 1024 * 1024) // <= 1 MB
    )
    .nullable(),
});

function AddCategoryForm({ onClose, editData }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("files", file);
    const response = await fileUpload(formData);
    return response?.data?.[0];
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      let imageName = editData?.category_image || null;

      if (values.category_image && values.category_image instanceof File) {
        imageName = await uploadImage(values.category_image);
      }

      const payload = {
        category_name: values.category_name,
        description: values.category_description,
        category_image: values.category_image
      };

      if (imageName) {
        payload.category_image = imageName;
      }

      let res;
      if (editData) {
        res = await updateCategory(editData.id, payload);
        toast.success(res?.message);
      } else {
        res = await createCategory(payload);
        toast.success(res?.message);
      }

      resetForm();
      onClose?.();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    [createCategoryConstants.categoryName]: "",
    [createCategoryConstants.categoryDescription]: "",
    [createCategoryConstants.categoryImage]: null,
  };

  useEffect(() => {
    if (editData?.category_image) {
      setPreview(`${import.meta.env.VITE_BACKEND_BASE_IMAGE}/${editData.category_image}`);
    }
    setPreview()
  }, [editData]);

  return (
    <Formik
      enableReinitialize
      initialValues={
        editData
          ? {
              [createCategoryConstants.categoryName]: editData.category_name || "",
              [createCategoryConstants.categoryDescription]: editData.description || "",
              [createCategoryConstants.categoryImage]: null, 
            }
          : initialValues
      }
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col gap-2">
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
              icon={false}
            >
              {createCategoryConstants.cancelButton}
            </BaseButton>

            <BaseButton
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 text-white hover:bg-blue-700"
              icon={false}
            >
              {loading
                ? createCategoryConstants.savingText
                : editData
                ? createCategoryConstants.updateButton
                : createCategoryConstants.save}
            </BaseButton>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AddCategoryForm;
