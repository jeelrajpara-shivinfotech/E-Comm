export const regex = {
  uppercase: /[A-Z]/,
  num: /[0-9]/,
  specialChar: /[!@#$%^&*]/,
};

export const errorMessages = {
  Required: (field) => `${field} is required.`,
  invalidEmail: "Email should be in correct format.",
  passwordComplexity:
    "Your password should be at least 8 characters. Should include uppercase letter, lowercase letter, one number and one special character.",
  CategoryImage : "Image size should be less than 1 MB."
};