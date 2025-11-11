import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteCategory } from "../../Api/categoryApis";
import BaseButton from "../BaseComponents/BaseButton";
import { createCategoryConstants } from "../../common/constants/categoryConstants";

function DeleteCategory({ deleteId, onClose , onDeleteSuccess}) {
  const [loading, setLoading] = useState(false);

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const res = await deleteCategory(deleteId);
      toast.success(res.message );
      onDeleteSuccess();
      onClose?.()
    } catch (error) {
      toast.error(error.response?.data?.message );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-gray-700 mb-6">
        {createCategoryConstants.confirmationText}
      </p>
      <div className="flex justify-end gap-3">
        <BaseButton
          type="button"
          className="border border-gray-300 bg-white rounded-md hover:bg-gray-100"
          textColor="black"
          onClick={onClose}
          icon={false}
        >
          {createCategoryConstants.cancelButton}
        </BaseButton>
        <BaseButton
          type="button"
          disabled={loading}
          onClick={confirmDelete}
          className={`rounded-md bg-red-600 text-white hover:bg-red-700 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          icon={false}
        >
          {loading ? createCategoryConstants.deletingButton : createCategoryConstants.deleteButton}
        </BaseButton>
      </div>
    </div>
  );
}

export default DeleteCategory;
