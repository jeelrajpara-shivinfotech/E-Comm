import BaseActionButton from "../../Component/BaseComponents/BaseActionButton";
import { GoPencil, GoTrash } from "react-icons/go";
import { FaEye } from "react-icons/fa";
export const productHeaders = {
    list: "Product list",
    details: "Product details",
    add: "Add product",
    edit: "Edit product",
    delete: "Delete confirmation",
    noProductFound: "No product found",
};

export const productColumns = (handleView , handleDelete) => [
    {
        key: "id",
        label: "ID",
        sortable : true
    },
    {
        key: "name",
        label: "NAME",
        sortable : true
    },
    {
        key : "category",
        label : "CATEGORY NAME",
        render : (value) => <span>{value?.category_name}</span>,

    },
    {
        key: "variants",
        label: "Total Variants",
        render: (value) => <span>{value?.length ? value.length : "0"}</span>,
    },
    {
        key: "createdAt",
        label: "CREATED AT",
        render: (value) => <span>{new Date(value).toLocaleDateString()}</span>,
        sortable : true
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
                />
                <BaseActionButton
                    icon={GoPencil}
                    // onClick={() => handleEdit(row)}
                    title="Edit"
                    className="cursor-pointer"
                />
                <BaseActionButton
                    icon={GoTrash}
                    onClick={() => handleDelete(row.id)}
                    title="Delete"
                    className="cursor-pointer"
                />
            </div>
        ),
    },

]

export const productLabelConsts = {
    productName : "Product name",
    productTitle : "Product title",
    productColor : "Color",
    productPrice : "Price",
    productVarients : "Varients",
    categoryName : "Category name",
    productQuantity : "Quantity",
    productDescription : "Product description",
    productSize : "Size"
}

export const productPlaceHolder = {
    searchPlaceHolder : "Search product name"
}