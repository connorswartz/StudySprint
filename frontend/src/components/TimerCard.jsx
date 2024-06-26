import React, { useState, useEffect, useCallback } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Card, CardBody, Button } from '@nextui-org/react';
import axios from 'axios';
import PropTypes from 'prop-types';

const TimerCard = ({ selectedTask, onTaskUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(5 * 60); // Duration in seconds
  const [showModal, setShowModal] = useState(false);
  const [key, setKey] = useState(0);
  const [remainingTime, setRemainingTime] = useState(duration);
  const [startTime, setStartTime] = useState(null);
  const [isBreak, setIsBreak] = useState(false);

  const handleTimerComplete = useCallback(async () => {
    if (isBreak) {
      setIsBreak(false);
      setRemainingTime(duration);
      setKey((prevKey) => prevKey + 1);
    } else {
      const endTime = remainingTime - 1;
      try {
        const userId = parseInt(localStorage.getItem('userId'));
        const response = await axios.post('http://localhost:8000/api/sessions/', {
          user_id: userId,
          task_id: selectedTask.task_id,
          starttime: startTime,
          endtime: endTime,
          date: new Date().toISOString().slice(0, 10),
        });
        if (response.status === 201) {
          console.log("New session created successfully");
          const updatedTaskResponse = await axios.get(`http://localhost:8000/api/tasks/${selectedTask.task_id}/`);
          const updatedTask = updatedTaskResponse.data;
          await axios.patch(`http://localhost:8000/api/tasks/${selectedTask.task_id}/`, {
    completed_sessions: updatedTask.completed_sessions + 1,
          });
onTaskUpdate({ ...updatedTask, completed_sessions: updatedTask.completed_sessions + 1 });
          setIsBreak(true);
          setIsPlaying(true);
          setRemainingTime(5 * 60); // Set break duration to 5 minutes
          setKey((prevKey) => prevKey + 1);
          setStartTime(null);
  
          // Fetch the latest goal data after adding a new session
          const goalResponse = await axios.get(`http://localhost:8000/api/goals/?user_id=${userId}`);
          if (goalResponse.data.length > 0) {
            const latestGoal = goalResponse.data[goalResponse.data.length - 1];
            console.log("Latest goal:", latestGoal);
          }
        }
      } catch (error) {
        console.error('Error updating session and task:', error);
      }
    }
  }, [selectedTask, onTaskUpdate, duration, remainingTime, startTime, isBreak]);

  const handleOpenModal = () => {
    setIsPlaying(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleIncrement = () => {
    setDuration((prevDuration) => prevDuration + 5 * 60);
  };

  const handleDecrement = () => {
    if (duration > 5 * 60) {
      setDuration((prevDuration) => prevDuration - 5 * 60);
    }
  };

  const handleSubmit = () => {
    setRemainingTime(duration);
    setShowModal(false);
    setKey((prevKey) => prevKey + 1);
  };

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return (
      <div className="flex items-center justify-center">
        <div className="text-3xl font-bold">{minutes}:</div>
        <div className="text-3xl font-bold">{seconds < 10 ? `0${seconds}` : seconds}</div>
      </div>
    );
  };

  const handleStartStop = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      const endTime = remainingTime;
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.post('http://localhost:8000/api/sessions/', {
          user_id: userId,
          task_id: selectedTask.task_id,
          starttime: startTime,
          endtime: endTime,
          date: new Date().toISOString().slice(0, 10),
        });
        if (response.status === 201) {
          setStartTime(null);
        }
      } catch (error) {
        console.error('Error creating session:', error);
      }
    } else {
      setIsPlaying(true);
      setStartTime(remainingTime);
    }
  };

  return (
    <Card className="flex-1" style={{ flexGrow: 1.7 }}>
      <CardBody className="items-center">
        {showModal ? (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-900 rounded-lg shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-center text-white">Timer Settings</h2>
              <div className="mb-4">
                <p className="text-center text-white">Duration: {duration / 60} minutes</p>
                <div className="flex justify-center gap-4 mt-2">
                  <Button onClick={handleDecrement} style={{ backgroundColor: '#004777' }}>
                    -
                  </Button>
                  <Button onClick={handleIncrement} style={{ backgroundColor: '#004777' }}>
                    +
                  </Button>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={handleSubmit} color="success">
                  Submit
                </Button>
                <Button onClick={handleCloseModal} style={{backgroundColor: "#8B0000"}}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-center text-large mb-4 text-white">Timer</h1>
            {isBreak ? (
              <p className="text-center text-white mb-4">Break</p>
            ) : (
              selectedTask && <p className="text-center text-white mb-4">{selectedTask.name}</p>
            )}
            <CountdownCircleTimer
              key={key}
              size={260}
              isPlaying={isPlaying}
              duration={isBreak ? 5 * 60 : duration}
              initialRemainingTime={remainingTime}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[duration / 2, duration / 4, duration / 8, 0]}
              onComplete={handleTimerComplete}
              onUpdate={(remainingTime) => setRemainingTime(remainingTime)}
            >
              {renderTime}
            </CountdownCircleTimer>
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={handleStartStop} style={{ backgroundColor: '#004777' }}>
                {isPlaying ? 'Stop' : 'Start'}
              </Button>
              <Button onClick={handleOpenModal} style={{ backgroundColor: '#6A0DAD' }}>
                Settings
              </Button>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

TimerCard.propTypes = {
  selectedTask: PropTypes.object,
  onTaskUpdate: PropTypes.func.isRequired,
};

export default TimerCard;