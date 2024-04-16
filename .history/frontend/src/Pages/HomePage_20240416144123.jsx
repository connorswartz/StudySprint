import React, { useState } from "react";
import TimerCard from "../components/TimerCard";
import TaskCard from "../components/TaskCard";
import GoalCard from "../components/GoalCard";
import NavigationBar from "../components/NavigationBar";

const HomePage = () => {
  const userId = parseInt(localStorage.getItem("userId"));
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskSelect = (task) => {
    console.log("HomePage - Selected Task:", task);
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask) => {
    console.log("HomePage - Updated Task:", updatedTask);
    setSelectedTask(updatedTask);
  };

  const navItems = [
    { id: "Profile", label: "Profile", path: "/profilepage" },
    { id: "Home", label: "Home", path: "/homepage" },
    { id: "Report", label: "Performance Report", path: "/performancereport" },
  ];

  return (
    <main className="p-5">
      <h1 className="text-center text-3xl">StudySprint</h1>
      <div className="flex flex-col md:flex-row gap-5 mt-5">
        <TimerCard selectedTask={selectedTask} onTaskUpdate={handleTaskUpdate} />
        <div className="flex flex-col flex-1 gap-5">
          <TaskCard userId={userId} onTaskSelect={handleTaskSelect} />
          <GoalCard />
        </div>
      </div>
      <NavigationBar navItems={navItems} navItems Style={{ backgroundColor: '#004777', color: 'white' }}/>
    </main>
  );
};

export default HomePage;