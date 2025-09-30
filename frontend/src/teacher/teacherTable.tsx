import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeacher,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  setSearchQuery,
  setPage,
  setLimit,
} from "../slice/teacherSlice";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomDialog from "../components/ui/CustomDialog";
import CustomTextField from "../components/ui/CustomTextField";
import { RootState, AppDispatch } from "../store/store";
import { TeachersData } from "../type/teacher";

function TeachersTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { teachers, loading, error, page, limit, totalPages, query } =
    useSelector((state: RootState) => state.teachers);

  const [localSearch, setLocalSearch] = React.useState<string>(query);
  const [open, setOpen] = React.useState(false);
  const [editTeacher, setEditTeacher] = React.useState<TeachersData | null>(
    null
  );

  const role = sessionStorage.getItem("role");
  const isAdmin = role === "admin" || role === "admissionStaff";

  const [formData, setFormData] = React.useState<TeachersData>({
    _id: "",
    teacherName: "",
    email: "",
    // password: "",
    age: 0,
    gender: "Male",
    phone: "",
    dob: "",
    role: "teacher",
    Status: "",
    subject: "",
    empId: "",
  });

  React.useEffect(() => {
    dispatch(fetchTeacher({ query, page, limit }));
  }, [dispatch, query, page, limit]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localSearch));
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, dispatch]);

  const handleOpen = (teacher: TeachersData | null = null) => {
    setEditTeacher(teacher);
    setFormData({
      _id: teacher?._id ?? "",
      teacherName: teacher?.teacherName ?? "",
      email: teacher?.email ?? "",
    //   password: teacher?.password ?? "",
      age: teacher?.age ?? 0,
      gender: teacher?.gender ?? "Male",
      phone: teacher?.phone ?? "",
      dob: teacher?.dob
        ? new Date(teacher.dob).toISOString().split("T")[0]
        : "",
      role: teacher?.role ?? "teacher",
      Status: teacher?.Status ?? "",
      subject: teacher?.subject ?? "",
      empId: teacher?.empId ?? "",
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (field: keyof TeachersData, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    try {
      if (editTeacher && editTeacher._id) {
        await dispatch(
          updateTeacher({ id: editTeacher._id, updatedData: formData })
        ).unwrap();
        toast.success("Teacher updated successfully!");
      } else {
        await dispatch(addTeacher(formData)).unwrap();
        toast.success("Teacher added successfully!");
      }
      dispatch(fetchTeacher({ query, page, limit }));
      handleClose();
    } catch (err) {
      toast.error("Something went wrong while saving!");
    }
  };

  const handleDelete = async (id: string) => {
    console.log(id)
    try {
      await dispatch(deleteTeacher(id));
      toast.success("Teacher deleted successfully!");
      dispatch(fetchTeacher({ query, page, limit }));
    } catch (err) {
      toast.error("Failed to delete teacher!");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <TextField
          label="Search Teachers"
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
            +
          </Button>
        )}
      </div>

      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">EmpId</TableCell>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Status</TableCell>
              {isAdmin && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {teachers && teachers.length > 0 ? (
              teachers.map((teacher) => (
                <TableRow key={teacher._id}>
                  <TableCell>{teacher.teacherName}</TableCell>
                  <TableCell align="center">{teacher.email}</TableCell>
                  <TableCell align="center">{teacher.empId}</TableCell>
                  <TableCell align="center">{teacher.subject}</TableCell>
                  <TableCell align="center">{teacher.age}</TableCell>
                  <TableCell align="center">{teacher.gender}</TableCell>
                  <TableCell align="center">{teacher.phone}</TableCell>
                  <TableCell align="center">{teacher.Status}</TableCell>
                  {isAdmin && (
                    <TableCell align="center">
                      <Stack
                        spacing={1}
                        direction="row"
                        justifyContent="center"
                      >
                        <img
                          src="/edit.png"
                          width={20}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleOpen(teacher)}
                        />
                        <img
                          src="/bin.png"
                          width={25}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(teacher._id)}
                        />
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isAdmin ? 9 : 8} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
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
        title={editTeacher ? "Edit Teacher" : "Add Teacher"}
      >
        <div className="customContainer">
          <CustomTextField
            label="Name"
            value={formData.teacherName}
            onChange={(val) => handleChange("teacherName", val)}
          />
          <CustomTextField
            label="Email"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
          />
        </div>
        <div className="customContainer">
          <CustomTextField
            label="EmpId"
            value={formData.empId}
            onChange={(val) => handleChange("empId", val)}
          />
          <CustomTextField
            label="Subject"
            value={formData.subject}
            onChange={(val) => handleChange("subject", val)}
          />
        </div>
        <div className="customContainer">
          <CustomTextField
            label="Age"
            value={formData.age}
            onChange={(val) => handleChange("age", val)}
          />
          <FormControl sx={{ width: "100%", mt: 2 }}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="customContainer">
          <CustomTextField
            label="Phone"
            value={formData.phone}
            onChange={(val) => handleChange("phone", val)}
          />

          <FormControl sx={{ width: "100%", mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.Status}
              onChange={(e) => handleChange("Status", e.target.value)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </div>

        <CustomTextField
          label="DOB"
          value={formData.dob}
          onChange={(val) => handleChange("dob", val)}
        />
      </CustomDialog>
    </div>
  );
}

export default TeachersTable;
