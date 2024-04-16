import React from 'react';
import TimerCard from "../components/TimerCard";
import TaskCard from "../components/TaskCard";
import GoalCard from "../components/GoalCard";
import NavigationBar from "../components/NavigationBar"; // Ensure path is correct

const HomePage = () => {
  const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
  // Navigation items for the navbar
  const navItems = [
    { id: 'Profile', label: 'Profile', path: '/profilepage' },
    { id: 'Home', label: 'Home', path: '/homepage' },
    { id: 'Report', label: 'Report', path: '/performancereport' }
  ];

  return (
    <main className="p-5">
      <h1 className="text-center text-3xl">StudySprint</h1>
      <div className="flex flex-col md:flex-row gap-5 mt-5">
        <TimerCard />
        <div className="flex flex-col flex-1 gap-5">
          <TaskCard userId={userId} /> {/* Pass user ID as a prop */}
          <GoalCard />
        </div>
      </div>
      <NavigationBar navItems={navItems} />
    </main>
  );
};

export default HomePage;
