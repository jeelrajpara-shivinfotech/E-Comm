import React from "react";

function BaseActionButton({ 
  onClick, 
  icon: Icon, 
  title = "", 
  className = "" 
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-[1.8px] focus-visible:ring-offset-2 ring-offset-background transition-colors duration-200 p-0.5 size-8 rounded bg-transparent border border-gray-200 focus-visible:ring-gray-200 hover:text-blue-600 hover:border-blue-600 ${className}`}
      title={title}
    >
      {Icon && <Icon size={16} />}
    </button>
  );
}

export default BaseActionButton;
