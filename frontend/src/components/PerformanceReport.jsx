import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering components required by Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceReport = ({ data }) => {
  // Assuming 'data' is an object containing 'hours' and 'tasks', both of which are arrays of data
  const chartData = {
    labels: data.hours.map(item => item.label), // Labels should be the same for both datasets if they correspond to the same time periods
    datasets: [
      {
        label: 'Hours Worked',
        data: data.hours.map(item => item.value),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y-axis-hours',
      },
      {
        label: 'Tasks Completed',
        data: data.tasks.map(item => item.value),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y-axis-tasks',
        type: 'bar'
      }
    ],
  };

  const options = {
    scales: {
      'y-axis-hours': {
        type: 'linear',
        display: true,
        position: 'left',
      },
      'y-axis-tasks': {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false, // only draw grid where the bar chart is
        },
      },
    }
  };

  return (
    <div>
      <h2>Performance Report</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PerformanceReport;
