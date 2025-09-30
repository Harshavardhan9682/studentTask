// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   Paper,
//   Button,
//   TextField,
//   CircularProgress,
//   Pagination,
//   Box,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchStudent,
//   feeManagement,
//   setPage,
//   setSearchQuery,
// } from "../slice/studentSlice";
// import { RootState, AppDispatch } from "../store/store";

// const FeeManagement = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   const { students, loading, page, limit, totalPages, query } = useSelector(
//     (state: RootState) => state.students
//   );

//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editedFees, setEditedFees] = useState({
//     tuition: 0,
//     transport: 0,
//     lab: 0,
//   });

//   // fetch students on mount and whenever page/query changes
//   useEffect(() => {
//     dispatch(fetchStudent({ page, limit, query }));
//   }, [dispatch, page, limit, query]);

//   const handleEditClick = (student: any) => {
//     setEditingId(student._id);
//     setEditedFees({
//       tuition: student.fees?.tuition ?? 0,
//       transport: student.fees?.transport ?? 0,
//       lab: student.fees?.lab ?? 0,
//     });
//   };

//   const handleSave = (id: string) => {
//     const total =
//       (editedFees.tuition ?? 0) +
//       (editedFees.transport ?? 0) +
//       (editedFees.lab ?? 0);

//     dispatch(
//       feeManagement({
//         id,
//         fees: { ...editedFees, total },
//       })
//     );
//     setEditingId(null);
//   };

//   return (
//     <Box p={3}>
//       <h2>Fee Management</h2>

//       {/* 🔍 Search */}
//       <TextField
//         label="Search by name, admission no, or roll no"
//         value={query}
//         onChange={(e) => dispatch(setSearchQuery(e.target.value))}
//         fullWidth
//         margin="normal"
//       />

      
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
           
//               <TableCell>Name</TableCell>
//               <TableCell>Class</TableCell>
//               <TableCell>Tuition</TableCell>
//               <TableCell>Transport</TableCell>
//               <TableCell>Lab</TableCell>
//               <TableCell>Total</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={10} align="center">
//                   <CircularProgress />
//                 </TableCell>
//               </TableRow>
//             ) : students.length > 0 ? (
//               students.map((student) => {
//                 const isEditing = editingId === student._id;
//                 const currentFees = isEditing ? editedFees : student.fees;
//                 const total =
//                   (currentFees?.tuition ?? 0) +
//                   (currentFees?.transport ?? 0) +
//                   (currentFees?.lab ?? 0);

//                 return (
//                   <TableRow key={student._id}>
//                     <TableCell>{student.admissionNumber}</TableCell>
//                     <TableCell>{student.rollNumber}</TableCell>
//                     <TableCell>{student.studentName}</TableCell>
//                     <TableCell>{student.studentClass}</TableCell>

//                     <TableCell>
//                       {isEditing ? (
//                         <TextField
//                           type="number"
//                           value={editedFees.tuition}
//                           onChange={(e) =>
//                             setEditedFees((prev) => ({
//                               ...prev,
//                               tuition: Number(e.target.value),
//                             }))
//                           }
//                           size="small"
//                         />
//                       ) : (
//                         student.fees?.tuition ?? 0
//                       )}
//                     </TableCell>

//                     <TableCell>
//                       {isEditing ? (
//                         <TextField
//                           type="number"
//                           value={editedFees.transport}
//                           onChange={(e) =>
//                             setEditedFees((prev) => ({
//                               ...prev,
//                               transport: Number(e.target.value),
//                             }))
//                           }
//                           size="small"
//                         />
//                       ) : (
//                         student.fees?.transport ?? 0
//                       )}
//                     </TableCell>

//                     <TableCell>
//                       {isEditing ? (
//                         <TextField
//                           type="number"
//                           value={editedFees.lab}
//                           onChange={(e) =>
//                             setEditedFees((prev) => ({
//                               ...prev,
//                               lab: Number(e.target.value),
//                             }))
//                           }
//                           size="small"
//                         />
//                       ) : (
//                         student.fees?.lab ?? 0
//                       )}
//                     </TableCell>

//                     <TableCell>{total}</TableCell>
//                     <TableCell>{total === 0 ? "Paid" : "Unpaid"}</TableCell>

//                     <TableCell>
//                       {isEditing ? (
//                         <>
//                           <Button
//                             variant="contained"
//                             size="small"
//                             onClick={() => handleSave(student._id)}
//                           >
//                             Save
//                           </Button>
//                           <Button
//                             variant="outlined"
//                             size="small"
//                             onClick={() => setEditingId(null)}
//                             sx={{ ml: 1 }}
//                           >
//                             Cancel
//                           </Button>
//                         </>
//                       ) : (
//                         <Button
//                           variant="contained"
//                           size="small"
//                           onClick={() => handleEditClick(student)}
//                         >
//                           Edit
//                         </Button>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 );
//               })
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={10} align="center">
//                   No students found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

      
//       <Box display="flex" justifyContent="center" mt={2}>
//         <Pagination
//           count={totalPages}
//           page={page}
//           onChange={(_, value) => dispatch(setPage(value))}
//           color="primary"
//         />
//       </Box>
//     </Box>
//   );
// };

// export default FeeManagement;

