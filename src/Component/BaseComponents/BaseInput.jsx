import { Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useRef } from "react";
import BaseButton from "./BaseButton";

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
  accept = ".jpg,.jpeg,.png,.webp",
  setFieldValue,
  setPreview,
  min,
  onKeyDownCustom,
}) {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];
    setFileName(file ? file.name : "");
    if (setFieldValue) setFieldValue(name, file);
    if (file && setPreview) setPreview(URL.createObjectURL(file));
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

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
        {type === "file" ? (
          <div className="flex items-center gap-4 cursor-pointer bg-white rounded-md border border-gray-300">

            <input
              id={id}
              ref={fileInputRef}
              name={name}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />
            <BaseButton
              type="button"
              onClick={handleFileButtonClick}
              className="bg-gray-200 px-4"
              textColor="text-gray-700"
              icon={false}
            >
              Choose File
            </BaseButton>
            <span className="text-gray-500 text-sm">
              {fileName || "No file chosen"}
            </span>
          </div>
        ) : (
          <Field
            id={id}
            name={name}
            type={type === "password" && showPassword ? "text" : type}
            min={type === "number" ? min ?? 0 : min}
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (onKeyDownCustom) {
                onKeyDownCustom(e);
              }
            }}
            className="
      w-full border border-gray-300 rounded-md px-4 py-2 pr-10 
      focus:outline-none focus:border-black
      [appearance:textfield]
      [&::-webkit-inner-spin-button]:appearance-none
      [&::-webkit-outer-spin-button]:appearance-none
  "
          />

        )}

        {showToggle && type === "password" && (
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            tabIndex={-1}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
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