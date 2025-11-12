import React, { useEffect, useRef, useState } from 'react'
import { productColumns, productHeaders, productPlaceHolder } from '../../common/constants/productConstants'
import BaseButton from '../../Component/BaseComponents/BaseButton'
import BaseTable from "../../Component/BaseComponents/BaseTable"
import { FaPlus } from 'react-icons/fa'
import { deleteProduct, productListing } from '../../Api/productsApis'
import BaseModal from '../../Component/BaseComponents/BaseModal'
import ViewProducts from '../../Component/ProductBase/ViewProducts'
import BaseConfirmation from '../../Component/BaseComponents/BaseConfirmation'
import { toast } from 'react-toastify'
import { createCategoryConstants } from '../../common/constants/categoryConstants'

function Product() {
    const tableRef = useRef(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [viewData, setViewData] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [loading , setLoading] = useState(false);

    const handleView = (row) => {
        setViewData(row.id);
        setViewModalOpen(true);
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        setLoading(true);
        try {
            const res = await deleteProduct(deleteId);
            toast.success(res.message);
            handleDeleteSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
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
        <div className='md:p-6'>
            <div className="flex justify-between items-center flex-wrap gap-3 mb-5">
                <h2 className="text-2xl font-bold lexend">{productHeaders.list}</h2>
                <BaseButton
                    bgColor="bg-blue-600"
                    textColor="text-white"
                    iconPosition="left"
                    customIcon={<FaPlus className="h-4 w-4" />}
                // onClick={() => setIsModalOpen(true)}
                >
                    {productHeaders.add}
                </BaseButton>
            </div>
            <BaseTable
                ref={tableRef}
                columns={productColumns(handleView , confirmDelete)}
                fetchDataFn={productListing}
                searchPlaceholder={productPlaceHolder.searchPlaceHolder}
                pageKey="page"
                limitKey="pageSize"
                noDataFound={productHeaders.noProductFound}
            />

            <BaseModal
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                title={productHeaders.details}
            >
                {viewData && <ViewProducts id={viewData} />}
            </BaseModal>

            <BaseConfirmation
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title={productHeaders.delete}
                cancelText={createCategoryConstants.cancelButton}
                description={createCategoryConstants.confirmationText}
                confirmText={loading ? createCategoryConstants.deleteButton : createCategoryConstants.deleteButton}
                confirmButtonClass="bg-red-600 hover:bg-red-700 text-white"
                loading={loading}
            />
        </div>
    )
}

export default Product