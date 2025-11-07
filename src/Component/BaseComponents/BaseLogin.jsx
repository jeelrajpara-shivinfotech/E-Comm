import React, { useState } from "react";
import { Formik, Form } from "formik";
import BaseInput from "./BaseInput";
import BaseButton from "./BaseButton";
import { loginConstant } from "../../common/constants/loginConstant";

function BaseLogin({ handleSubmit, validationSchema }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-5 mt-6">
          {/* Email Field */}
          <BaseInput
            id="email"
            required={true}
            name="email"
            type="email"
            label={loginConstant.emailLabel}
            placeholder={loginConstant.emailPlaceholder}
          />

          {/* Password Field */}
          <BaseInput
            id="password"
            name="password"
            required = {true}
            type="password"
            label={loginConstant.passwordLabel}
            placeholder={loginConstant.passwordPlaceholder}
            showToggle={true}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />
          

          {/* Submit Button */}
          <BaseButton type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? loginConstant.loggingButton
              : loginConstant.loginButton}
          </BaseButton>
        </Form>
      )}
    </Formik>
  );
}

export default BaseLogin;
