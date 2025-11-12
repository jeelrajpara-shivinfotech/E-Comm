import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteCategory, getListOfCategory } from "../../Api/categoryApis";
import { categoryColumns, categoryHeaders, createCategoryConstants } from "../../common/constants/categoryConstants";
import BaseButton from "../../Component/BaseComponents/BaseButton";
import BaseTable from "../../Component/BaseComponents/BaseTable";
import BaseModal from "../../Component/BaseComponents/BaseModal";
import CreateCategory from "../../Component/CategoryBase/CreateCategory";
import ViewCategory from "../../Component/CategoryBase/ViewCategory";
import BaseConfirmation from "../../Component/BaseComponents/BaseConfirmation";
import { placeHolderConst } from "../../common/constants/dashboardConstants";

function Category() {
  const tableRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setLoading(true);
    try {
      const res = await deleteCategory(deleteId);
      toast.success(res.message || "Category deleted successfully");
      handleDeleteSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    } finally {
      setLoading(false);
    }
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
    setDeleteId(null);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="md:p-6">
      <div className="flex justify-between items-center flex-wrap gap-3 mb-5">
        <h2 className="text-2xl font-bold lexend">{categoryHeaders.list}</h2>
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

      <BaseTable
        ref={tableRef}
        columns={categoryColumns(confirmDelete, handleEdit, handleView)} // ✅ updated
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
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title={categoryHeaders.details}
      >
        {viewData && <ViewCategory id={viewData} />}
      </BaseModal>

      <BaseConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title={categoryHeaders.delete}
        cancelText={createCategoryConstants.cancelButton}
        description={createCategoryConstants.confirmationText}
        confirmText={loading ? createCategoryConstants.deleteButton : createCategoryConstants.deleteButton}
        confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
        loading={loading}
      />
    </div>
  );
}

export default Category;
