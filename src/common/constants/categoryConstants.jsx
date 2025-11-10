import { RiDeleteBin6Line } from "react-icons/ri";
import { GoPencil, GoTrash } from "react-icons/go";
import BaseActionButton from "../../Component/BaseComponents/BaseActionButton";

export const categoryHeaders = {
  list: "Category List",
  details: "Category Details",
  add: "Add Category",
  edit: "Edit Category",
};

export const categoryColumns = [
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
        <span className="text-gray-400 italic">No Image</span>
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
        <BaseActionButton icon={GoPencil}
          onClick={() => console.log("Edit", row)}
          title="Edit"
        />

        <BaseActionButton
          icon={GoTrash}
          onClick={() => console.log("Delete", row)}
          title="Delete"
        />
      </div>
    ),
  },
];