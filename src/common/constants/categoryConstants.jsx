import fallbackImage from "../../assets/bags.webp"
import { GoPencil, GoTrash } from "react-icons/go";
import BaseActionButton from "../../Component/BaseComponents/BaseActionButton";
import { FaEye } from "react-icons/fa";

export const categoryHeaders = {
  list: "Category List",
  details: "Category Details",
  add: "Add Category",
  edit: "Edit Category",
  noCategoryFound: "No Category Found",
};

export const categoryColumns = (handleDelete, handleEdit, handleView) => [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "category_image",
    label: "Image",
    render: (value) => {
      return value ? (
        <img
          src={`${import.meta.env.VITE_BACKEND_BASE_IMAGE}/${value}`}
          alt="category"
          className="w-10 h-10 rounded-lg object-cover"
        />
      ) : (
        <img
          src={fallbackImage}
          alt="category"
          className="w-10 h-10 rounded-lg object-cover"
        />
      );
    },
  },

  {
    key: "category_name",
    label: "Category Name",
  },
  {
    key: "description",
    label: "Description",
  },
  {
    key: "createdAt",
    label: "Created At",
    render: (value) => <span>{new Date(value).toLocaleDateString()}</span>,
  },
  {
    key: "product",
    label: "Total Products",
    render: (value) => <span>{value?.length ? value.length : "0"}</span>,
  },
  {
    key: "actions",
    label: "Actions",
    render: (_, row) => (
      <div className="flex gap-3">

        <BaseActionButton icon={FaEye}
          onClick={() => handleView(row)}
          title="Preview" />

        <BaseActionButton icon={GoPencil}
          onClick={() => handleEdit(row)}
          title="Edit"
        />

          <BaseActionButton
            icon={GoTrash}
            onClick={() => handleDelete(row.id)}
            title="Delete"
          />
      </div>
    ),
  },
];

export const createCategoryConstants = {
  categoryName : "category_name",
  categoryDescription : "category_description",
  categoryImage : "category_image",
  cancelButton : "Cancel",
  savingText : "Saving...",
  save : "Save",
  file : "file",
  updateButton : "Update",
}

export const createCategoryLabel = {
  categoryLabelName : "Category Name",
  categoryLabelDesc : "Category Description",
  categoryLabelImage : "Category Image"
}

export const createCategoryPlaceholder = {
  categoryNamePlaceholder : "Enter category name",
  categoryDescPlaceholder : "Enter category description",
}