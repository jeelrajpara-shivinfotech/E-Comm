export const regex = {
  UpperCase: /[A-Z]/,
  Num: /[0-9]/,
  SpecialChar: /[!@#$%^&*]/,
};

export const errorMessages = {
  Required: (field) => `${field} is required.`,
  InvalidEmail: "Email should be in correct format.",
  PasswordComplexity:
    "Your password should be at least 8 characters. Should include uppercase letter, lowercase letter, one number and one special character.",
};