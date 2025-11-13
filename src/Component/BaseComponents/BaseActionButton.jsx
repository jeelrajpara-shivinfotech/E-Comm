import React from "react";

function BaseActionButton({
  onClick,
  icon: Icon,
  title,
  className,
  tooltipBg,
  tooltipArrow
}) {
  return (
    <div className="relative inline-flex group">
      <button
        onClick={onClick}
        className={`inline-flex items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-[1.8px] focus-visible:ring-offset-2 ring-offset-background transition-colors duration-200 p-0.5 size-8 rounded bg-transparent border border-gray-200 focus-visible:ring-gray-200 hover:text-blue-600 hover:border-blue-600 ${className}`}
      >
        {Icon && <Icon size={16} />}
      </button>

      {/* Tooltip */}
      {title && (
        <div className="absolute bottom-full left-0 cursor-pointer mb-2 hidden group-hover:block z-50">
          <div
            className={`relative text-xs rounded-md py-2 px-2 shadow-md max-w-xs w-max whitespace-normal ${tooltipBg}`}
          >
            {title}
            {/* Tooltip arrow */}
            <div className={`absolute top-full left-4 w-0 h-0 border-4 border-transparent" ${tooltipArrow}`}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default BaseActionButton;
