
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
  data: Record<string, number>;
};

const StudentsPerMonthChart: React.FC<Props> = ({ data }) => {
  const allMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  
  const years = Object.keys(data).map((key) => key.split(" ")[1]);
  const targetYear = years[0] || new Date().getFullYear().toString();

  
  const currentDate = new Date();
   const currentYear = currentDate.getFullYear().toString();
  console.log("")
  const currentMonthIndex =
    targetYear === currentYear ? currentDate.getMonth() : 11; 

  const monthsToShow = allMonths.slice(0, currentMonthIndex + 1);
  const values = monthsToShow.map((month) => data[`${month} ${targetYear}`] || 0);

  const chartData = {
    labels: monthsToShow.map((m) => `${m} ${targetYear}`),
    datasets: [
      {
        label: `Students Joined in ${targetYear}`,
        data: values,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Line data={chartData} />
    </div>
  );
};

export default StudentsPerMonthChart;
