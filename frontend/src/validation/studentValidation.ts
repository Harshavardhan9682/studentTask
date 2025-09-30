import { Studentdata } from "../type/student";

export type ValidationErrors = Partial<Record<keyof Studentdata, string>>;

export const validateField = <K extends keyof Studentdata>(
  field: K,
  value: Studentdata[K]
): string => {
  if (value === "" || value === null || value === undefined) {
    return `This ${field} is required`;
  }

  if (field === "email" && typeof value === "string") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Invalid email format";
  }

  if (field === "age" && typeof value === "number") {
    if (value <= 0) return "Age must be positive";
  }

  if (field === "phone" && typeof value === "string") {
    if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
  }

  return "";
};

export const validateForm = (formData: Studentdata): ValidationErrors => {
  const errors: ValidationErrors = {};
  (Object.keys(formData) as (keyof Studentdata)[]) 
  .filter((field) => field !== "_id") 
  .forEach((field) => {
    const error = validateField(field, formData[field]);
    if (error) errors[field] = error;
    console.log("errors",errors)
  });
  return errors;
};
