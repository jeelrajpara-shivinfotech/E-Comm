const BaseSelect = ({
  options = [],
  value,
  onChange,
  label,
  className = "",
  disabled = false,
  placeholder = "Select...",
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`rounded-md px-2 py-1 bg-gray-200 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 ${className}`}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => {
          const key = typeof option === "object" ? option.value : option;
          const label = typeof option === "object" ? option.label : option;
          return (
            <option key={key} value={key}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default BaseSelect;
