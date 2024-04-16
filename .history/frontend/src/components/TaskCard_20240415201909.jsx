// TaskCard.jsx
import React, { useState, useEffect } from "react";
import { Card, CardBody, Input, Button, Spacer } from "@nextui-org/react";
import { ListboxWrapper } from "../components/ListboxWrapper";
import { Listbox, ListboxItem } from "@nextui-org/react";
import axios from "axios";
import PropTypes from "prop-types";

const TaskCard = ({ userId }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (selectedKeys.size > 0) {
      const selectedTaskId = Array.from(selectedKeys)[0];
      const selectedTask = tasks.find((task) => task.task_id === selectedTaskId);
      onTaskSelect(selectedTask);
    }
  }, [selectedKeys, tasks, onTaskSelect]);, [userId]);

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleAddTask = async () => {
	if (newTask.trim() !== "") {
		try {
			const response = await axios.post("http://localhost:8000/api/tasks/", {
			user_id: userId,
			name: newTask.trim(),
			});
			const newTaskId = response.data.task_id;
			setTasks([...tasks, { task_id: newTaskId, name: newTask.trim() }]);
			setNewTask("");
		} catch (error) {
		console.error("Error adding task:", error);
		}
	}
  };

  const handleRemoveTask = async (taskId) => {
	try {
		await axios.delete(`http://localhost:8000/api/tasks/${taskId}/`);
		setTasks(tasks.filter((task) => task.task_id !== taskId));
		setSelectedKeys(new Set());
	} catch (error) {
		console.error("Error removing task:", error);
	}
  };

  return (
    <Card>
      <h1 className="text-center mt-2 text-large">Select a Task</h1>
      <CardBody className="items-center">
        <div>
		<ListboxWrapper style={{ width: "100%" }}>
  <Listbox
    aria-label="Single selection example"
    variant="flat"
    disallowEmptySelection
    selectionMode="single"
    selectedKeys={selectedKeys}
    onSelectionChange={setSelectedKeys}
  >
    {tasks.map((task) => (
      <ListboxItem key={task.task_id}>
        {task.name}
        <Button
          size="xs"
          color="error"
          onClick={() => handleRemoveTask(task.task_id)}
          style={{ marginLeft: "10px" }}
        >
          Remove
        </Button>
      </ListboxItem>
    ))}
  </Listbox>
</ListboxWrapper>
          <Input
            placeholder="Enter a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Spacer y={1} />
          <Button onClick={handleAddTask} color="primary">
            Add Task
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

TaskCard.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default TaskCard;