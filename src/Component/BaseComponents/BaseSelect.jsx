import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export default function BaseSelect({
  id,
  name,
  label,
  error,
  options = [],
  value,
  onChange,
  className = "",
  placeholder = "Select...",
  disabled = false,
  required = false,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((opt) => opt.value === value);

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
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <button
        type="button"
        id={id}
        name={name}
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={`flex justify-between items-center w-full rounded-md border border-gray-300 bg-white text-gray-800 text-sm  px-3 py-2 focus:ring-1 focus:ring-blue-500 ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span>
          {selected ? selected.label : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>
        <IoChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md max-h-56 overflow-auto">
          {options.length > 0 ? (
            options.map((opt) => {
              const isSelected = value === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange({ target: { value: opt.value } });
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer ${
                    isSelected
                      ? "bg-blue-100 text-blue-600"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {opt.label}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-gray-400 text-sm">No options</div>
          )}
        </div>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
