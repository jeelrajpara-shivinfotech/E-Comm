import React from "react";

export default function BaseModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-lg p-6 relative">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        {/* Modal Content */}
        <div>{children}</div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
