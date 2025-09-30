import React, { useState } from "react";
import { AuthProvider, useAuth } from "../context/LoginContext";
import { sessionStorageGetItem } from "../axiosInstance/sessionStorage";
import {
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomTextField from "../components/ui/CustomTextField";

type LoginFormData = {
  email: string;
  password: string;
  role: string;
};

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginFormData>({
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [loading, setLoading] = useState(false);

  const handleFieldChange = (field: keyof LoginFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      console.log(form)
      await login(form.email, form.password, form.role);
    const role =sessionStorageGetItem("role")
      // console.log(role)
      if(role==="admin"){
        navigate("/admin")
      }else if(role==="students"){
        console.log("students dashboard")
      }else if(role==="admissionStaff"){
        console.log("admissionStaff dashboard")
      }else if(role==="Teacher"){
        console.log("Teacher dashboard")
      }else{
        console.error("check the role ")
      }
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.error || "Invalid credentials";
        setErrors({ email: msg, password: msg });
      } else {
        setErrors({ email: "Unexpected error occurred" });
      }
    } finally {
      setLoading(false);
    }
    console.log("last line 61 ")

  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <Paper sx={{ p: 3, maxWidth: 400, width: "100%", textAlign: "center" }}>
        <Typography variant="h5" mb={2}>Student Login</Typography>
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ width: "100%", textAlign: "left" }} error={!!errors.role}>
            <InputLabel>Role</InputLabel>
            <Select
              value={form.role}
              onChange={(e) => handleFieldChange("role", e.target.value)}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="student">Student</MenuItem>
               <MenuItem value="admissionStaff">AdmissionStaff</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>

            </Select>
          </FormControl>

          <CustomTextField
            label="Email"
            value={form.email}
            onChange={(val) => handleFieldChange("email", val)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <CustomTextField
            label="Password"
            // type="password"
            value={form.password}
            onChange={(val) => handleFieldChange("password", val)}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

const LoginFormWrapper: React.FC = () => (
  <AuthProvider>
    <LoginForm />
  </AuthProvider>
);

export default LoginFormWrapper;
