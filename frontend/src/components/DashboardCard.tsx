// import React, { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import StudentPerClassChart from "../components/charts/StudentPerClassChart";
// import StudentsPerMonthChart from "./charts/StudentPerMonthChart";
// import StudentsPerYearChart from "./charts/StudentPerYearChart";
// import { fetchStudent,fromTo } from "../slice/studentSlice";
// import { RootState, AppDispatch } from "../store/store";
// import dayjs, { Dayjs } from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// const Dashboard = () => {
//   const [value, setValue] = React.useState<Dayjs | null>(null);
//   const dispatch = useDispatch<AppDispatch>();

//   const students = useSelector((state: RootState) => state.students.students);
//   const loading = useSelector((state: RootState) => state.students.loading);

 
  


// const studentsPerMonth = students.reduce<Record<string, number>>((acc, s) => {
//   if (!s.dateOfJoining) return acc; 


//   const month = new Date(s.dateOfJoining).toLocaleString("default", {
//     month: "long",
//     year: "numeric",
//   });

//   acc[month] = (acc[month] || 0) + 1;
//   return acc;
// }, {});


// console.log("Students per month:", studentsPerMonth);

// const studentsPerYear = students.reduce<Record<string, number>>((acc, s) => {
//   const year = new Date(s.dateOfJoining).getFullYear();
//   acc[year] = (acc[year] || 0) + 1;
//   return acc;
// }, {});

// console.log("Students per year:", studentsPerYear);



//   useEffect(() => {
//     dispatch(fetchStudent({ page: 1, limit: 1000, query: "" })); 
//   }, [dispatch]);

//   const classList = ["1","2","3","4","5","6","7","8","9","10"];
//   const classData = useMemo(() => {
//     return classList.map((cls) => ({
//       className: `Class ${cls}`,
//       count: students.filter((s) => s.studentClass === cls).length,
//     }));
//   }, [students]);


//   return (
//   <div className="chatDashboard">
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker', 'DatePicker']}>
//         <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
//         <DatePicker
//           label="Controlled picker"
//           value={value}
//           onChange={(newValue) => setValue(newValue)}
//         />
//       </DemoContainer>
//     </LocalizationProvider>
//       <div className="p-5 bar-chart">
//       <h1 className="text-xl font-bold mb-6">Dashboard</h1>
//       {loading ? <p>Loading...</p> : <StudentPerClassChart data={classData} />}
//     </div>
//        <div className="p-6 bar-chart" >
//       <h1 className="text-xl font-bold mb-4">Dashboard</h1>
//       {loading ? <p>Loading...</p> : <StudentsPerYearChart  data={studentsPerYear} />}
//     </div> 
//  <div className="p-6 line-chart">
//       <h1 className="text-xl font-bold mb-4">Dashboard</h1>
//       {loading ? <p>Loading...</p> : <StudentsPerMonthChart data={studentsPerMonth}/>}
//     </div> 
  
//   </div>

//   );
// };

// export default Dashboard;

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentPerClassChart from "../components/charts/StudentPerClassChart";
import StudentsPerMonthChart from "./charts/StudentPerMonthChart";
import StudentsPerYearChart from "./charts/StudentPerYearChart";
import { fetchStudent, fromTo } from "../slice/studentSlice";
import { RootState, AppDispatch } from "../store/store";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button } from "@mui/material";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();

  const students = useSelector((state: RootState) => state.students.students);
  const loading = useSelector((state: RootState) => state.students.loading);

  // Date state
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  // Normal fetch (initial load)
  useEffect(() => {
    dispatch(fetchStudent({ page: 1, limit: 1000, query: "" }));
  }, [dispatch]);

  // Fetch filtered data when user clicks "Apply"
  const handleFilter = () => {
    if (fromDate && toDate) {
      dispatch(
        fromTo({
          fromDate: fromDate.format("YYYY-MM-DD"),
          toDate: toDate.format("YYYY-MM-DD"),
        })
      );
    }
  };

  // Students per month
  const studentsPerMonth = students.reduce<Record<string, number>>((acc, s) => {
    if (!s.dateOfJoining) return acc;
    const month = new Date(s.dateOfJoining).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  // Students per year
  const studentsPerYear = students.reduce<Record<string, number>>((acc, s) => {
    const year = new Date(s.dateOfJoining).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const classList = ["1","2","3","4","5","6","7","8","9","10"];
  const classData = useMemo(() => {
    return classList.map((cls) => ({
      className: `Class ${cls}`,
      count: students.filter((s) => s.studentClass === cls).length,
    }));
  }, [students]);

  return (
   <Box>
     <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker
            label="From Date"
            value={fromDate}
            onChange={(newValue) => setFromDate(newValue)}
          />
          <DatePicker
            label="To Date"
            value={toDate}
            onChange={(newValue) => setToDate(newValue)}
          />
        </DemoContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilter}
          disabled={!fromDate || !toDate}
          style={{ marginTop: "1rem" }}
        >
          Apply Filter
        </Button>
      </LocalizationProvider>
    </Box>
    <Box>
      <div className="chatDashboard">
    
      <div className="p-5 bar-chart">
        <h1 className="text-xl font-bold mb-6">Students Per Class</h1>
        {loading ? <p>Loading...</p> : <StudentPerClassChart data={classData} />}
      </div>

      <div className="p-6 bar-chart">
        <h1 className="text-xl font-bold mb-4">Students Per Year</h1>
        {loading ? <p>Loading...</p> : <StudentsPerYearChart data={studentsPerYear} />}
      </div>

      <div className="p-6 line-chart">
        <h1 className="text-xl font-bold mb-4">Students Per Month</h1>
        {loading ? <p>Loading...</p> : <StudentsPerMonthChart data={studentsPerMonth} />}
      </div>
    </div>
    </Box>
   </Box>
  );
};

export default Dashboard;

