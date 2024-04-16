import React, { useState } from "react";
import TimerCard from "../components/TimerCard";
import TaskCard from "../components/TaskCard";
import GoalCard from "../components/GoalCard";
import NavigationBar from "../components/NavigationBar";

const HomePage = () => {
  const userId = parseInt(localStorage.getItem("userId"));
  const [selectedTask, setSelectedTask] = useState("");

  const handleTaskSelect = (taskName) => {
    console.log("HomePage - Selected Task:", taskName);
    setSelectedTask(taskName);
  };

  const navItems = [
    { id: "Profile", label: "Profile", path: "/profilepage" },
    { id: "Home", label: "Home", path: "/homepage" },
    { id: "Report", label: "Report", path: "/performancereport" },
  ];

  return (
    <main className="p-5">
      <h1 className="text-center text-3xl">StudySprint</h1>
      <div className="flex flex-col md:flex-row gap-5 mt-5">
      <TimerCard selectedTask={selectedTask} />
        <div className="flex flex-col flex-1 gap-5">
          <TaskCard userId={userId} onTaskSelect={handleTaskSelect} />
          <GoalCard />
        </div>
      </div>
      <NavigationBar navItems={navItems} />
    </main>
  );
};

export default HomePage;