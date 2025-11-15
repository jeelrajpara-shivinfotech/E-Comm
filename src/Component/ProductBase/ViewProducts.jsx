import React, { useEffect, useState } from "react";
import { viewProduct } from "../../Api/productsApis";
import { baseImageUrl } from "../../common/constants/config";
import fallbackImg from "../../assets/bags.webp";
import BaseLoader from "../BaseComponents/BaseLoader";
import { productHeaders, productLabelConsts } from "../../common/constants/productConstants";
import { tableConstant } from "../../common/constants/tableConstant";

function ViewProducts({ id }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    // Track image loading for each variant
    const [imageLoading, setImageLoading] = useState({});

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await viewProduct(id);
            setProduct(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) return <BaseLoader overlay={false} />;
    if (!product) return <p className="text-center py-5">{productHeaders.noProductFound}</p>;

    return (
        <div className="space-y-4 lexend">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <p className="text-gray-700 font-semibold text-base mb-1">
                        {productLabelConsts.productName}
                    </p>
                    <p className="bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg font-medium text-gray-800">
                        {product.name}
                    </p>
                </div>

                <div className="flex flex-col">
                    <p className="text-gray-700 font-semibold text-base mb-1">
                        {productLabelConsts.categoryName}
                    </p>
                    <p className="bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg font-medium text-gray-800">
                        {product.category.category_name}
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-lg font-semibold">{productLabelConsts.productVarients}</h3>

                <div
                    className={
                        product.variants.length > 1
                            ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                            : "space-y-2"
                    }
                >
                    {product.variants.map((variant) => {
                        const imageUrl = variant.image?.image_path
                            ? `${baseImageUrl}/${variant.image.image_path}`
                            : fallbackImg;

                        return (
                            <div
                                key={variant.id}
                                className="border rounded-xl shadow-sm border-gray-200 bg-white"
                            >
                                <div className="w-full h-48 bg-gray-200 relative rounded-t-lg overflow-hidden">
                                    {imageLoading[variant.id] !== false && (
                                        <BaseLoader/>
                                    )}

                                    <img
                                        src={imageUrl}
                                        alt={variant.product_title_name}
                                        className={`w-full h-48 object-center rounded-t-lg transition-opacity duration-300 ${
                                            imageLoading[variant.id] === false
                                                ? "opacity-100"
                                                : "opacity-0"
                                        }`}
                                        onLoad={() =>
                                            setImageLoading((prev) => ({
                                                ...prev,
                                                [variant.id]: false,
                                            }))
                                        }
                                        onError={(e) => {
                                            e.target.src = fallbackImg;
                                            setImageLoading((prev) => ({
                                                ...prev,
                                                [variant.id]: false,
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="p-4 space-y-2">
                                    <div>
                                        <p className="text-gray-700 font-medium">
                                            {productLabelConsts.productTitle}
                                        </p>
                                        <p className="bg-gray-50 border border-gray-200 px-3 py-1 rounded-lg mt-1">
                                            {variant.product_title_name}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-700 font-medium">
                                            {productLabelConsts.productDescription}
                                        </p>
                                        <p className="bg-gray-50 border border-gray-200 px-3 py-1 rounded-lg wrap-break-word">
                                            {variant.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                                        <div>
                                            <p className="text-gray-700 font-medium">
                                                {productLabelConsts.productColor}
                                            </p>
                                            <p className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg mt-1">
                                                {variant.color}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-700 font-medium">
                                                {productLabelConsts.productSize}
                                            </p>
                                            <p className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg mt-1">
                                                {variant.size}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-700 font-medium">
                                                {productLabelConsts.productPrice}
                                            </p>
                                            <p className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg mt-1">
                                                {tableConstant.rupee}
                                                {variant.price}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray-700 font-medium">
                                                {productLabelConsts.productQuantity}
                                            </p>
                                            <p className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg mt-1">
                                                {variant.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ViewProducts;
