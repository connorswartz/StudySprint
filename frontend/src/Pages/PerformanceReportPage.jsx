import React from 'react';
import PerformanceReport from "../components/PerformanceReport";
import NavigationBar from "../components/NavigationBar";

const navItems = [
  { id: 'Profile', label: 'Profile', path: '/profilepage' },
  { id: 'Home', label: 'Home', path: '/homepage' },
  { id: 'Report', label: 'Report', path: '/performancereport' }
];

const PerformanceReportPage = () => {
  return (
    <main className="p-5 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xl p-5 bg-white shadow-md rounded">
      <h1 className="text-lg font-semibold text-center mb-4" style={{ color: 'black' }}>Performance Report</h1>
        <PerformanceReport />
      </div>
      <NavigationBar navItems={navItems} />
    </main>
  );
};

export default PerformanceReportPage;