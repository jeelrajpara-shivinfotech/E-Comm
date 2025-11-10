import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { getListOfCategory } from "../../Api/categoryApis";
import { categoryColumns, categoryHeaders } from "../../common/constants/categoryConstants";
import { placeHolderConst } from "../../common/constants/dashboardConstants";
import BaseButton from "../../Component/BaseComponents/BaseButton";
import BaseTable from "../../Component/BaseComponents/BaseTable";
import BaseModal from "../../Component/BaseComponents/BaseModal";
import CreateCategory from "../../Component/CategoryBase/CreateCategory";

function Category() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        columns={categoryColumns}
        fetchDataFn={getListOfCategory}
        searchPlaceholder={placeHolderConst.categoryPlaceHolder}
        pageKey="page"
        limitKey="pageSize"
      />

      {/* Modal for Add Category */}
      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Category"
      >
        <CreateCategory onClose={() => setIsModalOpen(false)} />
      </BaseModal>
    </div>
  );
}

export default Category;
