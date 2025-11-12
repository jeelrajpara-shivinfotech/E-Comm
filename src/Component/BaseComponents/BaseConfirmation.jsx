import React from 'react'
import BaseModal from './BaseModal';
import BaseButton from './BaseButton';
import { createCategoryConstants } from '../../common/constants/categoryConstants';
const BaseConfirmation = ({ isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText,
    cancelText,
    loading = false,
    confirmButtonClass = "bg-red-600 hover:bg-red-700 text-white", }) => {
    if (!isOpen) return null;

    return (
        <>
            <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
                <p className="text-gray-700 mb-6">{description}</p>
                <div className="flex justify-end gap-3">
                    <BaseButton
                        type="button"
                        onClick={onClose}
                        icon={false}
                        className="border border-gray-300 bg-white rounded-md hover:bg-gray-100"
                        textColor="black"
                    >
                        {createCategoryConstants.noButton}
                    </BaseButton>
                    <BaseButton
                        type="button"
                        onClick={onConfirm}
                        icon={false}
                        disabled={loading}
                        className={`rounded-md ${confirmButtonClass} ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? `${confirmText}...` : confirmText}
                    </BaseButton>
                </div>
            </BaseModal>
        </>
    )

}
export default BaseConfirmation;