export const regex = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  num: /[0-9]/,
  specialChar: /[!@#$%^&*]/,
};

export const errorMessages = {
  Required: (field) => `${field} is required.`,
  invalidEmail: "Email should be in correct format.",
  minLength: "Password must be at least 8 characters long.",
  uppercase: "Password must contain at least one uppercase letter.",
  lowercase: "Password must contain at least one lowercase letter.",
  number: "Password must contain at least one number.",
  specialChar: "Password must contain at least one special character (!@#$%^&*).",
  CategoryImage: "Image size should be less than 1 MB.",
  minPrice : "Price must be positive.",
  minQuantity : "Quantity must be at least 1.",
  minDescription : "Description must be at least 10 characters.",
  maxDescription : "Description must not exceed 500 characters.",
  minVariant : "At least one variant is required."
};