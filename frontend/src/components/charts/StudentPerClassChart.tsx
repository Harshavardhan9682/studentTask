import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
  data: { className: string; count: number }[];
};

const StudentPerClassChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.className),
    datasets: [
      {
        label: "Students per Class",
        data: data.map((item) => item.count),
        backgroundColor: [
          "#3b82f6",
          "#22c55e",
          "#f97316",
          "#a855f7",
          "#ef4444",
          "#14b8a6",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Students per Class" },
    },
    
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StudentPerClassChart;
