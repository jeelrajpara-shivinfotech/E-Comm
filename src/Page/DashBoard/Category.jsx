import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { deleteCategory, getListOfCategory } from "../../Api/categoryApis";
import { categoryColumns, categoryHeaders } from "../../common/constants/categoryConstants";
import BaseButton from "../../Component/BaseComponents/BaseButton";
import BaseTable from "../../Component/BaseComponents/BaseTable";
import BaseModal from "../../Component/BaseComponents/BaseModal";
import CreateCategory from "../../Component/CategoryBase/CreateCategory";
import { placeHolderConst } from "../../common/constants/dashboardConstants";

function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this record?")) return;
    try {
      const res = await deleteCategory(id);
      toast.success(res.message || "Category deleted successfully");
      tableRef.current?.refresh();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap mb-5">
        <h2 className="text-2xl font-bold lexend">{categoryHeaders.list}</h2>
        <div className="w-auto">
          <BaseButton
            bgColor="bg-blue-600"
            textColor="text-white"
            iconPosition="left"
            customIcon={<FaPlus className="h-4 w-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Category
          </BaseButton>
        </div>
      </div>

      <BaseTable
        columns={categoryColumns(handleDelete)}
        fetchDataFn={getListOfCategory}
        searchPlaceholder={placeHolderConst.categoryPlaceHolder}
        pageKey="page"
        limitKey="pageSize"
      />

      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Category"
      >
        <CreateCategory
          onClose={() => {
            setIsModalOpen(false);
            tableRef.current?.refresh(); 
          }}
        />
      </BaseModal>
    </div>
  );
}

export default Category;
