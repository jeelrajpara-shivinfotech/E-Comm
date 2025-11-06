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
              label={LoginConstants.emailLabel}
              placeholder={LoginConstants.emailPlaceholder}
            />

            {/* Password Field */}
            <BaseInput
              id="password"
              name="password"
              type="password"
              label={LoginConstants.passwordLabel}
              placeholder={LoginConstants.passwordPlaceholder}
              showToggle={true}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />

            {/* Submit Button */}
            <BaseButton type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? LoginConstants.loggingButton
                : LoginConstants.loggingButton}
            </BaseButton>
          </Form>
        )}
      </Formik>
  );
}

export default BaseLogin;
