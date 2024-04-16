import { React, useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Input, Button } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import axios from "axios";

const GoalCard = () => {
  const [goal, setGoal] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchGoal();
    fetchProgress();
  }, []);

  const fetchGoal = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:8000/api/goals/?user_id=${userId}`);
      if (response.data.length > 0) {
        setGoal(response.data[0].no_of_minutes);
      }
    } catch (error) {
      console.error("Error fetching goal:", error);
    }
  };

  const fetchProgress = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const today = new Date().toISOString().slice(0, 10);
      const response = await axios.get(`http://localhost:8000/api/sessions/?user_id=${userId}&date=${today}`);
      const sessions = response.data;
      const totalMinutes = sessions.reduce((sum, session) => {
        const duration = (session.endtime - session.starttime) / 60; // Convert seconds to minutes
        return sum + duration;
      }, 0);
      setProgress(totalMinutes);
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  const handleGoalChange = (value) => {
    setGoal(value);
  };

  const handleGoalSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post("http://localhost:8000/api/goals/", {
        user_id: userId,
        no_of_minutes: goal,
      });
      console.log("Goal submitted:", response.data);
    } catch (error) {
      console.error("Error submitting goal:", error);
    }
  };

  const handleDecrement = () => {
    if (goal > 0) {
      setGoal(goal - 1);
    }
  };

  const handleIncrement = () => {
    setGoal(goal + 1);
  };

  return (
    <Card>
      <h1 className="text-center mt-2 text-large">Move Goal</h1>
      <p className="text-center text-default-500 text-small">Set your daily activity goal.</p>
      <CardBody>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            onClick={handleDecrement}
            size="sm"
            light
            style={{ borderRadius: "50%", width: "40px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            -
          </Button>
          <span style={{ margin: "0 16px", fontSize: "24px", fontWeight: "bold" }}>{goal}</span>
          <Button
            onClick={handleIncrement}
            size="sm"
            light
            style={{ borderRadius: "50%", width: "10px", height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            +
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "24px", marginBottom: "32px" }}>
          <Button onClick={handleGoalSubmit} size="sm">
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
          value={(progress / goal) * 100}
          showValueLabel={true}
        />
      </CardBody>
    </Card>
  );
};

export default GoalCard;