import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import PerformanceReport from "../components/PerformanceReport";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformanceReportPage = () => {
  const [reportData, setReportData] = useState({
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [{
      label: 'Hours Worked',
      data: [8, 6, 7, 9, 6],
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }, {
      label: 'Tasks Completed',
      data: [5, 3, 4, 2, 5],
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    }]
  });

  const fetchPerformanceData = async () => {
    try {
      // Uncomment and modify the URL to your API
      // const response = await axios.get('http://localhost:8000/api/performance');
      // setReportData(transformData(response.data));
      console.log('Data fetched and processed');
    } catch (error) {
      console.error('Fetch error:', error);
      // Handle error, display an error message, etc.
    }
  };

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  return (
    <main className="p-5 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xl p-5 bg-white shadow-md rounded" style={{ height: '500px' }}>
        <h1 className="text-lg font-semibold text-center mb-4">Performance Report</h1>
        <Bar data={reportData} options={{ responsive: true, maintainAspectRatio: true }} />
      </div>
    </main>
  );
};

export default PerformanceReportPage;
