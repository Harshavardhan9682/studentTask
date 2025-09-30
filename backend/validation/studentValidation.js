const Joi = require("joi");

const studentValidationSchema = Joi.object({
  studentName: Joi.string().min(3).required().messages({
    "string.empty": "Student name is required",
    "string.min": "Student name must be at least 3 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
  }),
  role:Joi.string().required().messages({
    "string.empty": "role is required",
  }),
  studentClass: Joi.string().required().messages({
    "string.empty": "Class is required",
  }),
  age: Joi.number().integer().min(3).max(30).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be at least 3",
    "number.max": "Age must be less than 30",
    "any.required": "Age is required",
  }),
  gender: Joi.string().valid("Male", "Female", "Other").required().messages({
    "any.only": "Gender must be Male, Female or Other",
    "any.required": "Gender is required",
  }),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    "string.empty": "Phone number is required",
    "string.pattern.base": "Phone must be a valid 10 digit number",
  }),
  guardian: Joi.string().required().messages({
    "string.empty": "Guardian name is required",
  }),
});

module.exports = studentValidationSchema;
