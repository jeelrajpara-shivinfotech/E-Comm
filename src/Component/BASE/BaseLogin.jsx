import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LOGIN_CONSTANTS } from "../../common/constants/LoginConstants";
import BaseButton from "./BaseButton";
import { loginSchema } from "../../common/Validations/LoginSchema";

function BaseLogin({ handleSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-5 mt-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {LOGIN_CONSTANTS.EMAIL_LABEL}
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-black"
                placeholder={LOGIN_CONSTANTS.EMAIL_PLACEHOLDER}
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {LOGIN_CONSTANTS.PASSWORD_LABEL}
              </label>

              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:border-black"
                  placeholder={LOGIN_CONSTANTS.PASSWORD_PLACEHOLDER}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FaRegEye size={18} />
                  ) : (
                    <FaRegEyeSlash size={18} />
                  )}
                </button>
              </div>

              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <BaseButton type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? LOGIN_CONSTANTS.LOGGING_IN_BUTTON
                : LOGIN_CONSTANTS.LOGIN_BUTTON}
            </BaseButton>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default BaseLogin;
