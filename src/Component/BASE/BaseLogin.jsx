import React, { useState } from "react";
import { Formik, Form } from "formik";
import { LoginConstants } from "../../common/constants/LoginConstants";
import BaseInput from "./BaseInput";
import BaseButton from "./BaseButton";

function BaseLogin({ handleSubmit , validationSchema}) {
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
              name="email"
              type="email"
              label={LoginConstants.EmailLabel}
              placeholder={LoginConstants.EmailPlaceholder}
            />

            {/* Password Field */}
            <BaseInput
              id="password"
              name="password"
              type="password"
              label={LoginConstants.PasswordLabel}
              placeholder={LoginConstants.PasswordPlaceholder}
              showToggle={true}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />

            {/* Submit Button */}
            <BaseButton type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? LoginConstants.LoggingButton
                : LoginConstants.LoginButton}
            </BaseButton>
          </Form>
        )}
      </Formik>
  );
}

export default BaseLogin;
