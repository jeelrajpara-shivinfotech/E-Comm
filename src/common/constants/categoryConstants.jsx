import fallbackImage from "../../assets/bags.webp"
import { GoPencil, GoTrash } from "react-icons/go";
import BaseActionButton from "../../Component/BaseComponents/BaseActionButton";
import { FaEye } from "react-icons/fa";
import { baseImageUrl } from "./config";

export const categoryHeaders = {
  list: "Category list",
  details: "Category details",
  add: "Add category",
  edit: "Edit category",
  delete: "Delete confirmation",
  noCategoryFound: "No category found",
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
      const imageSrc = value ? `${baseImageUrl}/${value}` : fallbackImage;

      return (
        <img
          src={imageSrc}
          alt="category"
          className="w-10 h-10 rounded-lg object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
      );
    },
  },

  {
    key: "category_name",
    label: "Category Name",
    sortable: true,
  },
  {
    key: "description",
    label: "description",
    render: (value) => {
      const shouldTruncate = value?.length > 10;
      const truncatedText = shouldTruncate ? value.slice(0, 10) + '..' : value

      return (
        <div className="relative group">
          <span
            className={`block truncate text-gray-800 transition ${shouldTruncate ? "cursor-pointer" : ""
              }`}
          >
            {truncatedText}
          </span>
          {shouldTruncate && (
            <div className="absolute top-full left-0 cursor-pointer mt-2 hidden group-hover:block z-50">
              <div className="bg-gray-200 text-gray-900 text-xs rounded-md py-2 px-3 shadow-md max-w-xs w-max whitespace-normal wrap-break-word">
                {value}
                <div className="absolute bottom-full left-4 w-0 h-0 border-4 border-transparent border-b-gray-200"></div>
              </div>
            </div>
          )}
        </div>
      );
    },
  },

  {
    key: "createdAt",
    label: "Created At",
    sortable: true,
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
        <BaseActionButton
          icon={FaEye}
          onClick={() => handleView(row)}
          title="Preview"
          className="cursor-pointer"
          tooltipBg="bg-blue-600 text-white"
          tooltipArrow="border-t-blue-600"
        />
        <BaseActionButton
          icon={GoPencil}
          onClick={() => handleEdit(row)}
          title="Edit"
          className="cursor-pointer"
          tooltipBg="bg-blue-600 text-white"
          tooltipArrow="border-t-blue-600"
        />
        <BaseActionButton
          icon={GoTrash}
          onClick={() => handleDelete(row.id)}
          title="Delete"
          className="cursor-pointer"
          tooltipBg="bg-red-600 text-white"
          tooltipArrow="border-t-red-600"
        />
      </div>
    ),
  },
];

export const createCategoryConstants = {
  categoryName: "category_name",
  categoryDescription: "category_description",
  categoryImage: "category_image",
  cancelButton: "Cancel",
  noButton : "No",
  savingText: "Saving...",
  save: "Save",
  addButton : "Submit",
  addingButton : "Submitting..",
  file: "file",
  updateButton: "Update",
  updatingButton : "Updating...",
  deleteButton: "Yes",
  confirmationText: "Are you sure you want to delete this record?"
}

export const createCategoryLabel = {
  categoryLabelName: "Category name",
  categoryLabelDesc: "Category description",
  categoryLabelImage: "Category image"
}

export const createCategoryPlaceholder = {
  categoryNamePlaceholder: "Enter category name",
  categoryDescPlaceholder: "Enter category description",
}