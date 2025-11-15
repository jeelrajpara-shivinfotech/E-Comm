import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { categoryDropdown, fileUpload } from "../../Api/categoryApis";
import { viewProduct } from "../../Api/productsApis";
import fallbackImage from "../../assets/bags.webp";
import { baseImageUrl } from "../../common/constants/config";
import { addProduct, updateProducts } from "../../Api/productsApis";
import BaseInput from "../BaseComponents/BaseInput";
import BaseButton from "../BaseComponents/BaseButton";
import { createCategoryConstants } from "../../common/constants/categoryConstants";
import BaseSelect from "../BaseComponents/BaseSelect";
import { FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { productFieldConsts, productLabelConsts, productPlaceHolder } from "../../common/constants/productConstants";
import { errorMessages } from "../../common/validation";
import BaseLoader from "../BaseComponents/BaseLoader";

const validationSchema = Yup.object({
    name: Yup.string().required(errorMessages.Required(productLabelConsts.productName)),
    category_id: Yup.number().required(errorMessages.Required(productLabelConsts.categoryName)),
    product_variants: Yup.array()
        .of(
            Yup.object({
                product_title_name: Yup.string().required(errorMessages.Required(productLabelConsts.productTitle)),
                description: Yup.string().required(errorMessages.Required(productLabelConsts.productDescription)),
                color: Yup.string().required(errorMessages.Required(productLabelConsts.productColor)),
                size: Yup.string().required(errorMessages.Required(productLabelConsts.productSize)),
                price: Yup.number().required(errorMessages.Required(productLabelConsts.productPrice)).min(0, errorMessages.minPrice),
                quantity: Yup.number().required(errorMessages.Required(productLabelConsts.productQuantity)).min(1, errorMessages.minQuantity),
                variant_image: Yup.mixed()
                    .required(errorMessages.Required(productLabelConsts.productImage))
                    .test("fileSize", errorMessages.CategoryImage, (value) => {
                        if (!value) return false;
                        if (typeof value === "string") return true;
                        return value?.size <= 1024 * 1024;
                    }),
            })
        )
        .min(1, errorMessages.minVariant),
});

export default function CreateEdit({ onClose, editData }) {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productData, setProductData] = useState(null);
    const [previewList, setPreviewList] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await categoryDropdown();
                setCategories(res?.data || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!editData?.id) return;

        const fetchProduct = async () => {
            try {
                const res = await viewProduct(editData?.id);
                const data = res?.data;

                setProductData({
                    name: data?.name || "",
                    category_id: data?.category?.id || "",
                    product_variants:
                        data?.variants?.map((v) => ({
                            product_title_name: v?.product_title_name || "",
                            description: v?.description || "",
                            color: v?.color || "",
                            size: v?.size || "",
                            price: v?.price || "",
                            quantity: v?.quantity || "",
                            variant_image: v?.image?.image_path || "",
                            preview: v?.image?.image_path
                                ? `${baseImageUrl}/${v?.image?.image_path}`
                                : fallbackImage,
                        })) || [],
                });

                setPreviewList(
                    data?.variants?.map(
                        (v) =>
                        (v?.image?.image_path
                            ? `${baseImageUrl}/${v?.image?.image_path}`
                            : fallbackImage)
                    ) || []
                );
            } catch (err) {
                console.error(err);
                toast.error(err?.response?.data?.message);
            }
        };

        fetchProduct();
    }, [editData]);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("files", file);
        const response = await fileUpload(formData);
        return response?.data?.[0];
    };

    const initialValues =
        productData || {
            name: "",
            category_id: "",
            product_variants: [
                {
                    product_title_name: "",
                    description: "",
                    color: "",
                    size: "",
                    price: "",
                    quantity: "",
                    variant_image: null,
                    preview: null,
                },
            ],
        };

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        try {
            const variants = await Promise.all(
                values?.product_variants?.map(async (v) => {
                    let imageData = v?.variant_image;

                    if (v?.variant_image instanceof File) {
                        const uploaded = await uploadImage(v?.variant_image);
                        imageData = { image_path: uploaded };
                    } else if (typeof v?.variant_image === "string" && v?.variant_image !== "") {
                        imageData = { image_path: v?.variant_image };
                    } else {
                        imageData = null;
                    }

                    return {
                        product_title_name: v?.product_title_name,
                        description: v?.description,
                        color: v?.color,
                        size: v?.size,
                        price: Number(v?.price),
                        quantity: Number(v?.quantity),
                        variant_image: imageData,
                    };
                }) || []
            );

            const payload = {
                name: values?.name,
                category_id: Number(values?.category_id),
                product_variants: variants,
            };

            let res;
            if (editData?.id) {
                res = await updateProducts(editData?.id, payload);
                toast.success(res?.message);
            } else {
                res = await addProduct(payload);
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

    useEffect(() => {
        if (editData?.product_variants?.length) {
            const previews = [];

            editData?.product_variants?.forEach((variant, i) => {
                const img = new Image();
                const imageUrl = variant?.variant_image
                    ? `${baseImageUrl}/${variant?.variant_image}`
                    : fallbackImage;

                img.src = imageUrl;

                img.onload = () => {
                    previews[i] = imageUrl;
                    setPreviewList([...previews]);
                };
                img.onerror = () => {
                    previews[i] = fallbackImage;
                    setPreviewList([...previews]);
                };
            });
        }
    }, [editData]);

    const isVariantInvalid = (variants) => {
        return variants.some(v =>
            !v.product_title_name ||
            !v.description ||
            !v.color ||
            !v.size ||
            !v.price ||
            !v.quantity ||
            !v.variant_image
        );
    };



    return (
        <div className="relative w-full min-h-[300px]">
            {(editData?.id && !productData) ? (
                <div className="absolute inset-0 flex items-center justify-center z-50 bg-white/60 backdrop-blur-sm">
                    <BaseLoader />
                </div>
            ) : (
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, errors }) => (
                        <Form className="flex flex-col gap-3 p-1">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <BaseInput
                                    id={productFieldConsts.name}
                                    name={productFieldConsts.name}
                                    label={productLabelConsts.productName}
                                    placeholder={productPlaceHolder.productNamePlaceHolder}
                                    required
                                />

                                <BaseSelect
                                    id={productFieldConsts.categoryId}
                                    name={productFieldConsts.categoryId}
                                    label={productLabelConsts.categoryName}
                                    value={values?.category_id}
                                    onChange={(e) =>
                                        setFieldValue(productFieldConsts.categoryId, e?.target?.value)
                                    }
                                    options={
                                        categories?.map((item) => ({
                                            value: item?.id,
                                            label: item?.category_name,
                                        })) || []
                                    }
                                    placeholder={productPlaceHolder.selectCategoryPlaceHolder}
                                    className="w-full"
                                    required
                                    error={errors?.category_id}
                                />
                            </div>

                            <FieldArray name={productFieldConsts.productVariants}>
                                {({ push, remove }) => (
                                    <div className="flex flex-col gap-4 mt-2">

                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-lg font-semibold">{productLabelConsts.productVarients}</h3>

                                            <BaseButton
                                                type="button"
                                                onClick={() =>
                                                    push({
                                                        product_title_name: "",
                                                        description: "",
                                                        color: "",
                                                        size: "",
                                                        price: "",
                                                        quantity: "",
                                                        variant_image: null,
                                                        preview: null,
                                                    })
                                                }
                                                disabled={isVariantInvalid(values.product_variants)}
                                                className={`rounded-lg shadow transition ${isVariantInvalid(values.product_variants)
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-blue-600 hover:bg-blue-700"
                                                    }`}
                                                customIcon={<FaPlus className="w-4 h-4" />}
                                                iconPosition="left"
                                            >
                                                {productLabelConsts.addVariant}
                                            </BaseButton>
                                        </div>

                                        {values?.product_variants?.map((variant, index) => (
                                            <div
                                                key={index}
                                                className="border-gray-200 shadow-md rounded-lg p-4 bg-white relative"
                                            >
                                                <div className="grid grid-cols-2 gap-2">
                                                    <BaseInput
                                                        name={`${productFieldConsts.productVariants}.${index}.${productFieldConsts.productTitle}`}
                                                        label={productLabelConsts.productTitle}
                                                        placeholder={productPlaceHolder.productTitlePlaceHolder}
                                                        required
                                                    />

                                                    <BaseInput
                                                        name={`${productFieldConsts.productVariants}.${index}.${productFieldConsts.productDescription}`}
                                                        label={productLabelConsts.productDescription}
                                                        placeholder={productPlaceHolder.productDescription}
                                                        required
                                                    />

                                                    <BaseInput
                                                        name={`${productFieldConsts.productVariants}.${index}.${productFieldConsts.productColor}`}
                                                        label={productLabelConsts.productColor}
                                                        placeholder={productPlaceHolder.productColor}
                                                        required
                                                    />

                                                    <BaseInput
                                                        name={`${productFieldConsts.productVariants}.${index}.${productFieldConsts.productSize}`}
                                                        label={productLabelConsts.productSize}
                                                        placeholder={productPlaceHolder.productSize}
                                                        required
                                                        onKeyDownCustom={(e) => { if (e.key === "-" || e.key === "_" ) { e.preventDefault(); } }}
                                                    />

                                                    <BaseInput
                                                        name={`${productFieldConsts.productVariants}.${index}.${productFieldConsts.productPrice}`}
                                                        label={productLabelConsts.productPrice}
                                                        placeholder={productPlaceHolder.productPrice}
                                                        type="number"
                                                        required
                                                        onKeyDownCustom={(e) => { if (e.key === "-" || e.key === "_" ) { e.preventDefault(); } }}
                                                    />

                                                    <BaseInput
                                                        name={`${productFieldConsts.productVariants}.${index}.${productFieldConsts.productQuantity}`}
                                                        label={productLabelConsts.productQuantity}
                                                        placeholder={productPlaceHolder.productQuantity}
                                                        type="number"
                                                        required
                                                        onKeyDownCustom={(e) => { if (e.key === "-" || e.key === "_" ) { e.preventDefault(); } }}
                                                    />
                                                </div>

                                                <div className="mt-3">
                                                    <BaseInput
                                                        name={`${productFieldConsts.productVariants}.${index}.${productFieldConsts.productImage}`}
                                                        label={productLabelConsts.productImage}
                                                        type="file"
                                                        required
                                                        setFieldValue={setFieldValue}
                                                        setPreview={(url) => {
                                                            const updated = [...previewList];
                                                            updated[index] = url;
                                                            setPreviewList(updated);
                                                        }}
                                                    />

                                                    {previewList?.[index] && (
                                                        <img
                                                            src={previewList[index]}
                                                            alt="preview"
                                                            className="w-16 h-16 mt-2 rounded-md border"
                                                            onError={(e) => (e.target.src = fallbackImage)}
                                                        />
                                                    )}
                                                </div>

                                                {values.product_variants.length > 1 && (
                                                    <BaseButton
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="absolute top-2 right-2 text-red-600 bg-transparent"
                                                        icon={false}
                                                    >
                                                        <RxCross2 className="text-xl" />
                                                    </BaseButton>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </FieldArray>

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
                                        ? editData
                                            ? createCategoryConstants.updatingButton
                                            : createCategoryConstants.addingButton
                                        : editData
                                            ? createCategoryConstants.updateButton
                                            : createCategoryConstants.addButton}
                                </BaseButton>
                            </div>

                        </Form>
                    )}
                </Formik>
            )}
            {loading && (
                <BaseLoader/>
            )}
        </div>
    );
}
