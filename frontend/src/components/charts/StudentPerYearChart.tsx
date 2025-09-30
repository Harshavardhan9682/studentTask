// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// type Props = {
//   data: Record<string, number>; 
// };

// const StudentsPerYearChart: React.FC<Props> = ({ data }) => {
//   const labels = Object.keys(data);
//   const values = Object.values(data);

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: "Students Joined in year ",
//         data: values,
//         backgroundColor: "rgba(16, 185, 129, 0.6)",
//       },
//     ],
//   };

//   return (
//     <div className="w-full max-w-3xl mx-auto p-4">
//       <Bar data={chartData} />
//     </div>
//   );
// };

// export default StudentsPerYearChart;
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
  data: Record<string, number>; // e.g., { "2025": 8 }
};

const StudentsPerYearChart: React.FC<Props> = ({ data }) => {
  // Fixed years you want to show
  const allYears = ["2020", "2021", "2022", "2023", "2024", "2025"];

  // Map your data to the fixed years, default 0 if missing
  const values = allYears.map((year) => data[year] || 0);

  const chartData = {
    labels: allYears,
    datasets: [
      {
        label: "Students Joined in Year",
        data: values,
        backgroundColor: "rgba(16, 185, 129, 0.6)",
      },
    ],
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Bar data={chartData} />
    </div>
  );
};

export default StudentsPerYearChart;
