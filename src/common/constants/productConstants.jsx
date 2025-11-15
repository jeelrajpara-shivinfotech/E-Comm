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

export const productColumns = (handleView, handleDelete, handleEdit) => [
    {
        key: "id",
        label: "ID",
        sortable: true
    },
    {
        key: "name",
        label: "NAME",
        sortable: true,
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
        key: "category",
        label: "CATEGORY NAME",
        render: (value) => <span>{value?.category_name}</span>,

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
        sortable: true
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

]

export const productLabelConsts = {
    productName: "Product name",
    productTitle: "Product title",
    productColor: "Color",
    productPrice: "Price",
    productVarients: "Varients",
    categoryName: "Category name",
    productQuantity: "Quantity",
    productDescription: "Product description",
    productSize: "Size",
    productImage: "Product image",
    addVariant: "Add variant"
}

export const productPlaceHolder = {
    searchPlaceHolder: "Search product or category name",
    productNamePlaceHolder: "Enter product name",
    selectCategoryPlaceHolder: "Select category",
    productTitlePlaceHolder: "Enter product title",
    productDescription: "Enter product description",
    productColor: "Enter product color",
    productSize: "Enter product size",
    productPrice: "Enter product price",
    productQuantity: "Enter quantity"
}

export const productFieldConsts = {
    name: "name",
    categoryId: "category_id",
    productVariants: "product_variants",
    productTitle: "product_title_name",
    productDescription: "description",
    productColor: "color",
    productSize: "size",
    productPrice: "price",
    productQuantity: "quantity",
    productImage: "variant_image",
};
