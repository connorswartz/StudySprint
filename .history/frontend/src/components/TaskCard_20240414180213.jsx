import React from "react";
import { useState } from "react";
import { Card, CardBody, Input, Button, Spacer } from "@nextui-org/react";
import { ListboxWrapper } from "../components/ListboxWrapper";
import { Listbox, ListboxItem } from "@nextui-org/react";
import axios from "axios";

const TaskCard = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));
  const [tasks, setTasks] = useState(["CPSC471", "Business", "SENG300", "Single Date", "Iteration"]);
  const [newTask, setNewTask] = useState("");

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleAddTask = async () => {
	if (newTask.trim() !== "") {
	  try {
		const response = await axios.post("http://localhost:8000/api/tasks/", {
		  report_id: 1,  // Replace with the actual report_id
		  user_id: 1,    // Replace with the actual user_id
		  task_name: newTask.trim(),
		});
		const newTaskId = response.data.task_id;
		setTasks([...tasks, { id: newTaskId, name: newTask.trim() }]);
		setNewTask("");
	  } catch (error) {
		console.error("Error adding task:", error);
	  }
	}
  };

  const handleRemoveTask = (taskToRemove) => {
    setTasks(tasks.filter((task) => task !== taskToRemove));
    setSelectedKeys(new Set());
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
              {tasks.map((task, index) => (
                <ListboxItem key={`l${index}`}>
                  {task}
                  <Button
                    size="xs"
                    color="error"
                    onClick={() => handleRemoveTask(task)}
                    style={{ marginLeft: "10px" }}
                  >
                    Remove
                  </Button>
                </ListboxItem>
              ))}
            </Listbox>
          </ListboxWrapper>
          <p className="text-small text-default-500">Selected value: {selectedValue}</p>
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

export default TaskCard;