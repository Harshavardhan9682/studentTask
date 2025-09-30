import React from "react";
import { TextField } from "@mui/material";

interface CustomTextFieldProps {
  label: string;
  value: string | number;
  onChange:(value:string)=>void
  error?: boolean;
  helperText?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  value,
  onChange,
  error = false,
  helperText = "",
}) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      value={value}
      onChange={(e) => {
          const val = e.target.value;
          onChange(val);
      }}
      error={error}
      helperText={helperText}
    />
  );
};

export default CustomTextField;
