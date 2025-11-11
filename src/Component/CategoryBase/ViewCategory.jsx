import React, { useEffect, useState } from "react";
import { viewCategory } from "../../Api/categoryApis";
import BaseLoader from "../BaseComponents/BaseLoader";
import { categoryHeaders, createCategoryLabel } from "../../common/constants/categoryConstants";
import fallbackImage from "../../assets/bags.webp"

function ViewCategory({ id }) {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await viewCategory(id);
            setCategory(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchData();
    }, [id]);

    if (loading) return <div><BaseLoader overlay={false} /></div>;
    if (!category) return <div>{categoryHeaders.noCategoryFound}</div>;

    return (
        <div className="py-2 flex flex-col gap-2">
            <div>
                <div className="text-lg lexend mb-2">{createCategoryLabel.categoryLabelName}</div>
                <div className="border-gray-200 shadow-sm px-2 py-1 rounded-md bg-gray-100 wrap-break-word">{category.category_name}</div>
            </div>
            <div>
                <div className="text-lg lexend mb-2">{createCategoryLabel.categoryLabelDesc}</div>
                <div className="border-gray-200 shadow-sm px-2 py-1 rounded-md bg-gray-100 wrap-break-word">{category.description}</div>
            </div>
            <div>
                <div className="text-lg lexend mb-2">{createCategoryLabel.categoryLabelImage}</div>
                {category.category_image ? (
                    <img
                        src={`${import.meta.env.VITE_BACKEND_BASE_IMAGE}/${category.category_image}`}
                        alt={category.category_name}
                        className="w-32 h-32 object-cover rounded-lg border-gray-200 shadow-sm"
                    />
                ) : (
                    <img
                        src={fallbackImage}
                        alt="category"
                        className="w-32 h-32 object-cover rounded-lg border-gray-200 shadow-sm"
                    />
                )
                }
            </div>
        </div>
    );
}

export default ViewCategory;
