import { IoSearch, IoClose } from "react-icons/io5";

const BaseSearch = ({ value, onChange, searchPlaceholder = "Search..." }) => {
  return (
    <div className="relative">
      <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        placeholder={searchPlaceholder}
        value={value}
        onChange={onChange}
        className="w-full bg-white border border-gray-300 text-gray-700 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 inter"
      />

      {value && (
        <IoClose
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={() => onChange({ target: { value: "" } })}
        />
      )}
    </div>
  );
};

export default BaseSearch;
