

import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const Instructorchart = ({ courses = [] }) => {
  const [currchart, setcurrchart] = useState("students");

  const isMobile = window.innerWidth < 768; // md breakpoint


  const getRandomColors = (n) =>
    Array.from({ length: n }, () =>
      `rgb(${Math.floor(Math.random() * 256)},
           ${Math.floor(Math.random() * 256)},
           ${Math.floor(Math.random() * 256)})`
    );

  if (courses.length === 0) {
    return <p className="text-gray-400">No course data available</p>;
  }

  const studentData = {
    labels: courses.map((c) => c.coursename),
    datasets: [
      {
        data: courses.map((c) => c.totalstudentenrolled),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  const incomeData = {
    labels: courses.map((c) => c.coursename),
    datasets: [
      {
        data: courses.map((c) => c.totalamountgernerated),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  return (
    <div>
      <p className="mb-4 text-lg font-medium text-gray-200">Visualize</p>
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setcurrchart("students")}
          className={`rounded px-4 py-1 text-sm font-semibold ${
            currchart === "students"
              ? "bg-yellow-400 text-black"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setcurrchart("income")}
          className={`rounded px-4 py-1 text-sm font-semibold ${
            currchart === "income"
              ? "bg-yellow-400 text-black"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
        >
          Income
        </button>
      </div>

      {/* Responsive chart container */}
      <div className="mx-auto w-full max-w-2xl h-64 sm:h-80 md:h-96">
        <Pie
          data={currchart === "students" ? studentData : incomeData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "white",
                   font: {
              size: isMobile ? 8 : 14, // 👈 magic line
            },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Instructorchart;

