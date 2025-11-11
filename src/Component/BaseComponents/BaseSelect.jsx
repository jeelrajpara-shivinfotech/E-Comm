import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function BaseSelect({
  options = [],
  value,
  onChange,
  className = "",
  placeholder = "Select...",
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find(
    (opt) => (typeof opt === "object" ? opt.value : opt) === value
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`flex justify-between rounded-lg bg-gray-200 text-gray-800 text-xs px-2 py-1.5 w-12 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 lexend`}
      >
        <span>{selected ? selected.label || selected.value || selected : placeholder}</span>
        <IoChevronDown
          className={` w-4 h-4 text-gray-600 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className="absolute z-999 w-20 mt-1 text-left border border-gray-300 bg-white shadow-md rounded-md max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
          style={{
            scrollbarWidth: "thin",
          }}
        >
          {options.map((opt) => {
            const key = typeof opt === "object" ? opt.value : opt;
            const label = typeof opt === "object" ? opt.label : opt;
            const isSelected = value === key;

            return (
              <div
                key={key}
                onClick={() => {
                  onChange({ target: { value: key } });
                  setOpen(false);
                }}
                className={`flex py-1.5 px-2 text-xs cursor-pointer font-medium rounded-[4px] ${
                  isSelected
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
