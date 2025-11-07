
import { Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function BaseInput({
  id,
  name,
  type = "text",
  label,
  placeholder,
  showToggle = false,
  showPassword,
  required = false,
  togglePassword,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm mb-1.5 font-medium text-gray-600 leading-5 inter"
        >
          {label}
          {required && <span className="text-red-500 ms-1">*</span>} 
        </label>
      )}

      <div className="relative">
        <Field
          id={id}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-black"
        />

        {/* Password toggle icon */}
        {showToggle && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            tabIndex={-1}
          >
            {showPassword ? (
              <FaEye/>
            ) : (
              <FaEyeSlash/>
            )}
          </button>
        )}
      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
}

export default BaseInput;
