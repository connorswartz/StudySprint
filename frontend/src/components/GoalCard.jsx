import { React, useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Input, Button } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import axios from "axios";

const GoalCard = () => {
  const [goal, setGoal] = useState(5);
  const [progress, setProgress] = useState(0);
  const [latestGoalId, setLatestGoalId] = useState(null);

  useEffect(() => {
    fetchGoal();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchProgress();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [latestGoalId]);

  const fetchGoal = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:8000/api/goals/?user_id=${userId}`);
      console.log("Goal response data:", response.data);
      if (response.data.length > 0) {
        const latestGoal = response.data[response.data.length - 1];
        setGoal(latestGoal.no_of_minutes);
        setProgress(parseFloat(latestGoal.completed_minutes));
        setLatestGoalId(latestGoal.goal_id);
      }
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  };

  const fetchProgress = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:8000/api/goals/?user_id=${userId}`);
      console.log("Goal response data:", response.data);
      if (response.data.length > 0) {
        const latestGoal = response.data[response.data.length - 1];
        setProgress(parseFloat(latestGoal.completed_minutes));
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  const handleGoalSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (goal >= 1) {
        const response = await axios.post("http://localhost:8000/api/goals/", {
          user_id: userId,
          no_of_minutes: goal,
        });
        console.log("Goal submitted:", response.data);
        setLatestGoalId(response.data.goal_id);
        fetchGoal(); // Fetch the updated goal after submitting
      }
    } catch (error) {
      console.error("Error submitting goal:", error);
    }
  };

  const handleDecrement = () => {
    if (goal > 1) {
      setGoal(goal - 1);
    }
  };

  const handleIncrement = () => {
    setGoal(goal + 1);
  };

  const progressPercentage = goal > 0 ? Math.max(0, (progress / goal) * 100) : 0;

  return (
    <Card>
      <h1 className="text-center mt-2 text-large">Goal</h1>
      <p className="text-center text-default-500 text-small">How many minutes do you want to complete today?</p>
      <CardBody>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            onClick={handleDecrement}
            size="sm"
            light
            style={{ backgroundColor: "#8B0000", borderRadius: "50%", height: "60px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "25px" }}
          >
            -
          </Button>
          <span style={{ margin: "0 16px", fontSize: "24px", fontWeight: "bold" }}>{goal}</span>
          <Button
            onClick={handleIncrement}
            size="sm"
            light
            style={{ backgroundColor: "#004777", borderRadius: "50%", height: "60px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "25px" }}
          >
            +
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "24px", marginBottom: "32px" }}>
          <Button onClick={handleGoalSubmit} size="md">
            Set Goal
          </Button>
        </div>
        <Progress
          size="sm"
          radius="sm"
          classNames={{
            base: "max-w-md",
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          label="Minutes Completed"
          value={progressPercentage}
          showValueLabel={true}
        />
      </CardBody>
    </Card>
  );
};

export default GoalCard;