import React, { useState } from "react";
import TaskCard from "../components/TaskCard";
import TimerCard from "../components/TimerCard";
import NavigationBar from "../components/NavigationBar";

const navItems = [
  { id: 'Profile', label: 'Profile', path: '/profilepage' },
  { id: 'Home', label: 'Home', path: '/homepage' },
  { id: 'Report', label: 'Report', path: '/performancereport' }
];

const HomePage = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const userId = localStorage.getItem("userId");

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask) => {
    setSelectedTask(updatedTask);
  };

  return (
    <main className="p-5 flex justify-center items-center min-h-screen">
      <div className="flex flex-col md:flex-row gap-4">
        <TaskCard userId={userId} onTaskSelect={handleTaskSelect} />
        <TimerCard selectedTask={selectedTask} onTaskUpdate={handleTaskUpdate} />
      </div>
      <NavigationBar navItems={navItems} />
    </main>
  );
};

export default HomePage;