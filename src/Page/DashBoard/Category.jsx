import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteCategory, getListOfCategory } from "../../Api/categoryApis";
import { categoryColumns, categoryHeaders } from "../../common/constants/categoryConstants";
import BaseButton from "../../Component/BaseComponents/BaseButton";
import BaseTable from "../../Component/BaseComponents/BaseTable";
import BaseModal from "../../Component/BaseComponents/BaseModal";
import CreateCategory from "../../Component/CategoryBase/CreateCategory";
import { placeHolderConst } from "../../common/constants/dashboardConstants";
import ViewCategory from "../../Component/CategoryBase/ViewCategory";
import DeleteCategory from "../../Component/CategoryBase/DeleteCategory";

function Category() {
  const tableRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setEditModalOpen(true);
  };

  const handleView = (row) => {
    setViewData(row.id);
    setViewModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    tableRef.current?.refresh();
    setShowDeleteModal(false);
  };

  return (
    <div className="md:p-6">
      <div className="flex justify-between items-center flex-wrap gap-3 mb-5 ">
        <h2 className="text-2xl font-bold lexend">{categoryHeaders.list}</h2>
        <div className="w-auto">
          <BaseButton
            bgColor="bg-blue-600"
            textColor="text-white"
            iconPosition="left"
            customIcon={<FaPlus className="h-4 w-4" />}
            onClick={() => setIsModalOpen(true)}
          >
            {categoryHeaders.add}
          </BaseButton>
        </div>
      </div>

      <BaseTable
        ref={tableRef}
        columns={categoryColumns(handleDelete, handleEdit, handleView)}
        fetchDataFn={getListOfCategory}
        searchPlaceholder={placeHolderConst.categoryPlaceHolder}
        pageKey="page"
        limitKey="pageSize"
        noDataFound={categoryHeaders.noCategoryFound}
      />

      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={categoryHeaders.add}
      >
        <CreateCategory
          onClose={() => {
            setIsModalOpen(false);
            tableRef.current?.refresh();
          }}
        />
      </BaseModal>

      <BaseModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title={categoryHeaders.edit}
      >
        <CreateCategory
          editData={editData}
          onClose={() => {
            setEditModalOpen(false);
            tableRef.current?.refresh();
          }}
        />
      </BaseModal>

      <BaseModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title={categoryHeaders.delete}
      >
        <DeleteCategory
          deleteId={deleteId}
          onClose={() => setShowDeleteModal(false)}
          onDeleteSuccess={handleDeleteSuccess}
        />
      </BaseModal>
      
      <BaseModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title= {categoryHeaders.details}
      >
        {viewData && <ViewCategory id={viewData} />}
      </BaseModal>


    </div>
  );
}

export default Category;
