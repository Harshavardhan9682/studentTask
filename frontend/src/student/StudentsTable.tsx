import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  setSearchQuery,
  setPage,
  setLimit,
} from "../slice/studentSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Pagination,
  Stack,
  Button,
} from "@mui/material";
// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import CustomDialog from "../components/ui/CustomDialog";
import CustomTextField from "../components/ui/CustomTextField";
import { RootState, AppDispatch } from "../store/store";
import { Studentdata } from "../type/student";
import {
  validateField,
  validateForm,
  ValidationErrors,
} from "../validation/studentValidation";

function StudentsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { students, loading, error, page, limit, totalPages, query } =
    useSelector((state: RootState) => state.students);

  const [localSearch, setLocalSearch] = React.useState<string>(query);
  const [open, setOpen] = React.useState<boolean>(false);
  const [editStudent, setEditStudent] = React.useState<Studentdata | null>(
    null
  );



//   jest.mock('react-toastify', () => ({
//   ToastContainer: () => <div />,
//   toast: { success: jest.fn(), error: jest.fn() },
// }));

// // Mock Axios
// jest.mock('../axiosInstance/axiosInstance', () => ({
//   __esModule: true,
//   default: { get: jest.fn(), post: jest.fn() },
// }));
  
  const role = sessionStorage.getItem("role");
  const isAdmin = role === "admin" || role === "admissionStaff";

  console.log(role, "table");
  const [formData, setFormData] = React.useState<Studentdata>({
    studentName: "",
    email: "",
    role: "student",
    studentClass: "",
    dob: "",
    // dateOfJoining: "", 
    age: 0,
    gender: "Male",
    phone: "",
    guardian: "",
  });
  const [errors, setErrors] = React.useState<ValidationErrors>({});

  React.useEffect(() => {
    dispatch(fetchStudent({ query, page, limit }));
  }, [dispatch, query, page, limit]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localSearch));
    }, 1000);
    return () => clearTimeout(timer);
  }, [localSearch, dispatch]);

  const handleOpen = (student: Studentdata | null = null) => {
    setEditStudent(student);
    setFormData({
      studentName: student?.studentName ?? "",
      email: student?.email ?? "",
      studentClass: student?.studentClass ?? "",
      age: student?.age ?? 0,
      gender: student?.gender ?? "Male",
      phone: student?.phone ?? "",
      guardian: student?.guardian ?? "",
      role: student?.role ?? "student",
      //  dateOfJoining: student?.dateOfJoining
      // ? new Date(student.dateOfJoining).toISOString().split("T")[0]
      // : "",
      dob: student?.dob ? new Date(student.dob).toISOString().split("T")[0] : ""
    });

    setErrors({});
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (field: keyof Studentdata, value: string | number ) => {
    setFormData({ ...formData, [field]: value });
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // const isFormValid = React.useMemo(() => {
  //   const formErrors = validateForm(formData);
  //   return (
  //     Object.values(formData).every((val) => val !== "" && val !== null) &&
  //     Object.values(formErrors).every((err) => !err)
  //   );
  // }, [formData]);

  const isFormValid = React.useMemo(() => {
    const formErrors = validateForm(formData);
    return (
      (Object.entries(formData) as [keyof Studentdata, any][])
        .filter(([key]) => key !== "_id")
        .every(([_, val]) => val !== "" && val !== null) &&
      Object.values(formErrors).every((err) => !err)
    );
  }, [formData]);

  const handleSave = async () => {
    if (!isFormValid) {
      toast.error("Please fill all fields correctly!");
      return;
    }

    try {
      if (editStudent && editStudent._id) {
        console.log(editStudent);
        await dispatch(
          updateStudent({ id: editStudent._id, updatedData: formData })
        );
        toast.success("Student updated successfully!");
      } else {
        await dispatch(addStudent(formData));
         await dispatch(fetchStudent({ query, page, limit }));
        toast.success("Student added successfully!");
      }
      await dispatch(fetchStudent({ query, page, limit }));
      handleClose();
    } catch (err) {
      toast.error("Something went wrong while saving!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteStudent(id)).unwrap();
      toast.success("Student deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete student!");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <TextField
          label="Search Students"
          value={localSearch}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocalSearch(e.target.value)
          }
          sx={{ height: 50 }}
        />
        {isAdmin && (
          <Button
            variant="contained"
            onClick={() => handleOpen()}
            sx={{ width: "50px", height: "55px" }}
          >
            <h1>+</h1>
          </Button>
        )}
      </div>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 400, overflow: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Email</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Class</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Age</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Gender</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Phone</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Guardian</strong>
              </TableCell>
              {isAdmin && (
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((s: Studentdata, index) => (
              <TableRow key={s._id}>
                <TableCell>{s?.studentName}</TableCell>
                <TableCell align="center">{s?.email}</TableCell>
                <TableCell align="center">{s?.studentClass}</TableCell>
                <TableCell align="center">{s?.age}</TableCell>
                <TableCell align="center">{s?.gender}</TableCell>
                <TableCell align="center">{s?.phone}</TableCell>
                <TableCell align="center">{s?.guardian}</TableCell>
                <TableCell align="center">
                  <Stack spacing={1} direction="row" justifyContent="center">
                    <div className="btns">
                      {isAdmin && (
                        <>
                          <img
                            src="/edit.png"
                            alt="edit"
                            width={20}
                            height={20}
                            onClick={() => handleOpen(s)}
                            style={{ cursor: "pointer" }}
                          />
                          <img
                            src="/bin.png"
                            alt="delete"
                            width={25}
                            height={25}
                            onClick={() => s._id && handleDelete(s._id)}
                            style={{ cursor: "pointer" }}
                          />
                        </>
                      )}
                    </div>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="footer">
        <FormControl sx={{ mt: 2, width: 100 }}>
          <InputLabel sx={{ fontSize: 15 }}>No of Records</InputLabel>
          <Select
            value={limit}
            onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => dispatch(setPage(value))}
            color="primary"
          />
        </Box>
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        title={editStudent ? "Edit Student" : "Add Student"}
        disableSave={!isFormValid}
      >
        <div className="customContainer">
          <CustomTextField
            label="Name"
            value={formData.studentName}
            onChange={(val) => handleChange("studentName", val)}
            error={!!errors.studentName}
            helperText={errors.studentName}
          />

          <CustomTextField
            label="Email"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
            error={!!errors.email}
            helperText={errors.email}
          />
        </div>

        <div className="customContainer">
          <CustomTextField
            label="Class"
            value={formData.studentClass}
            onChange={(val) => handleChange("studentClass", val)}
            error={!!errors.studentClass}
            helperText={errors.studentClass}
          />
          <CustomTextField
            label="Age"
            value={formData.age}
            onChange={(val) => handleChange("age", val)}
            error={!!errors.age}
            helperText={errors.age}
          />
        </div>

        <div className="customContainer">
          <FormControl sx={{ width: "100%" }} error={!!errors.gender}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {errors.gender && (
              <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0" }}>
                {errors.gender}
              </p>
            )}
          </FormControl>
          <CustomTextField
            label="Phone"
            value={formData.phone}
            onChange={(val) => handleChange("phone", val)}
            error={!!errors.phone}
            // style={{margin:"0px"}}
            helperText={errors.phone}
          />
        </div>

        <div className="customContainer">
          <CustomTextField
            label="Guardian"
            value={formData.guardian}
            onChange={(val) => handleChange("guardian", val)}
            error={!!errors.guardian}
            helperText={errors.guardian}
          />
      
          <CustomTextField
  label="DOB"

  value={
    formData.dob
      ? new Date(formData.dob).toISOString().split("T")[0] 
      : ""
  }
 onChange={(val) => handleChange("dob", val)}   
  error={!!errors.dob}
  helperText={errors.dob}
/>

        </div>
      </CustomDialog>
    </div>
  );
}
console.log("running")

export default StudentsTable;
