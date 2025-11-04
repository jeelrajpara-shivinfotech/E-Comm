export const Regex = {
  UpperCase: /[A-Z]/,
  Num: /[0-9]/,
  SpecialChar: /[!@#$%^&*]/,
};

export const ErrorMessages = {
  Required: (field) => `${field} is required`,
  InvalidEmail: "Enter a valid email address",
  MinLength: (field, min) => `${field} must be at least ${min} characters`,
  UpperCaseError: "Must contain at least one uppercase letter",
  NumError: "Must contain at least one number",
  SpecialCharError: "Must contain at least one special character",
};
