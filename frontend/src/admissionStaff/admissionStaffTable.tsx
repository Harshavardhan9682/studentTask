import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdmissionStaff,
  addAdmissionStaff,
  updateAdmissionStaff,
  deleteAdmissionStaff,
  setSearchQuery,
  setPage,
  setLimit,
} from "../slice/admissionStaff";
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
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import CustomDialog from "../components/ui/CustomDialog";
import CustomTextField from "../components/ui/CustomTextField";
import { RootState, AppDispatch } from "../store/store";

import { AdmissionStaffData } from "../type/admissionStaff";

function AdmissionStaffTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { admissionStaff, loading, error, page, limit, totalPages, query } =
    useSelector((state: RootState) => state.staff);
  console.log(admissionStaff, "h");

  const [localSearch, setLocalSearch] = React.useState<string>(query);
  const [open, setOpen] = React.useState<boolean>(false);
  const [editStaff, setEditStaff] = React.useState<AdmissionStaffData | null>(
    null
  );

  const role = sessionStorage.getItem("role");
  const isAdmin = role === "admin" || role === "admissionStaff";

  const [formData, setFormData] = React.useState<AdmissionStaffData>({
    // _id: "",
    _id: "",
    teacherName: "",
    email: "",
    empId: "",
    Status: "",
    age: 0,
    gender: "Male",
    phone: "",
    dob: "",
    role: "teacher",
  });
  //   const [errors, setErrors] = React.useState<ValidationErrors>({});

  React.useEffect(() => {
    dispatch(fetchAdmissionStaff({ query, page, limit }));
  }, [dispatch, query, page, limit]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localSearch));
    }, 1000);
    return () => clearTimeout(timer);
  }, [localSearch, dispatch]);

  const handleOpen = (staff: AdmissionStaffData | null = null) => {
    setEditStaff(staff);
    setFormData({
      _id: staff?._id ?? "",
      teacherName: staff?.teacherName ?? "",
      email: staff?.email ?? "",
      empId: staff?.empId ?? "",
      Status: staff?.Status ?? "",
      age: staff?.age ?? 0,
      gender: staff?.gender ?? "Male",
      phone: staff?.phone ?? "",
      dob: staff?.dob ? new Date(staff.dob).toISOString().split("T")[0] : "",
      role: staff?.role ?? "teacher",
    });

    // setErrors({});
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (
    field: keyof AdmissionStaffData,
    value: string | number
  ) => {
    setFormData({ ...formData, [field]: value });

    // setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSave = async () => {
    // if (!isFormValid) {
    //   toast.error("Please fill all fields correctly!");
    //   return;
    // }

    try {
      if (editStaff && editStaff._id) {
        await dispatch(
          updateAdmissionStaff({ id: editStaff._id, updatedData: formData })
        ).unwrap();
        toast.success("Staff updated successfully!");
      } else {
        await dispatch(addAdmissionStaff(formData)).unwrap();
        toast.success("Staff added successfully!");
      }
      await dispatch(fetchAdmissionStaff({ query, page, limit }));
      handleClose();
    } catch (err) {
      toast.error("Something went wrong while saving!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteAdmissionStaff(id)).unwrap();
      toast.success("Staff deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete staff!");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div style={{ margin: "20px 0", display: "flex", gap: "10px" }}>
        <TextField
          label="Search Staff"
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

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 400, overflow: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>EmpId</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Name</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Email</strong>
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
                <strong>Role</strong>
              </TableCell>
              {isAdmin && (
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {admissionStaff && admissionStaff.length > 0 ? (
              admissionStaff.map((staff) => (
                <TableRow key={staff._id}>
                  <TableCell>{staff.empId}</TableCell>
                  <TableCell align="center">{staff.teacherName}</TableCell>
                  <TableCell align="center">{staff.email}</TableCell>
                  <TableCell align="center">{staff.age}</TableCell>
                  <TableCell align="center">{staff.gender}</TableCell>
                  <TableCell align="center">{staff.phone}</TableCell>
                  <TableCell align="center">{staff.role}</TableCell>
                  {isAdmin && (
                    <TableCell align="center">
                      <Stack
                        spacing={1}
                        direction="row"
                        justifyContent="center"
                      >
                        <img
                          src="/edit.png"
                          alt="edit"
                          width={20}
                          height={20}
                          onClick={() => handleOpen(staff)}
                          style={{ cursor: "pointer" }}
                        />
                        <img
                          src="/bin.png"
                          alt="delete"
                          width={25}
                          height={25}
                          onClick={() => staff._id && handleDelete(staff._id)}
                          style={{ cursor: "pointer" }}
                        />
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isAdmin ? 8 : 7} align="center">
                  Data not found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="footer">
        <FormControl sx={{ mt: 2, width: 100 }}>
          <InputLabel>No of Records</InputLabel>
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
        title={editStaff ? "Edit Staff" : "Add Staff"}
        // disableSave={!isFormValid}
      >
        <div className="customContainer">
          <CustomTextField
            label="Name"
            value={formData.teacherName}
            onChange={(val) => handleChange("teacherName", val)}
            // error={!!errors.teacherName}
            // helperText={errors.teacherName}
          />

          <CustomTextField
            label="Email"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
            // error={!!errors.email}
            // helperText={errors.email}
          />
        </div>

        <div className="customContainer">
          <CustomTextField
            label="EmpId"
            value={formData.empId}
            onChange={(val) => handleChange("empId", val)}
            // error={!!errors.empId}
            // helperText={errors.empId}
          />
          <CustomTextField
            label="Age"
            value={formData.age}
            onChange={(val) => handleChange("age", val)}
            // error={!!errors.age}
            // helperText={errors.age}
          />
        </div>

        <div className="customContainer">
          <FormControl
            sx={{ width: "100%" }}
            //   error={!!errors.gender}
          >
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
          <CustomTextField
            label="Phone"
            value={formData.phone}
            onChange={(val) => handleChange("phone", val)}
            // error={!!errors.phone}
            // helperText={errors.phone}
          />
        </div>

        <div className="customContainer">
          <CustomTextField
            label="DOB"
            value={formData.dob}
            onChange={(val) => handleChange("dob", val)}
            // error={!!errors.dob}
            // helperText={errors.dob}
          />
          <CustomTextField
            label="Status"
            value={formData.Status}
            onChange={(val) => handleChange("Status", val)}
            // error={!!errors.Status}
            // helperText={errors.Status}
          />
        </div>
      </CustomDialog>
    </div>
  );
}

export default AdmissionStaffTable;
