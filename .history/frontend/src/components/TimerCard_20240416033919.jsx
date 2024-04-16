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

  const handleTimerComplete = useCallback(async () => {
    const stopTime = new Date().toISOString();
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.post('http://localhost:8000/api/sessions/', {
        user_id: userId,
        task_id: selectedTask.task_id,
        starttime: startTime,
        endtime: stopTime,
        date: new Date().toISOString().slice(0, 10),
      });
      if (response.status === 201) {
        const updatedTaskResponse = await axios.get(`http://localhost:8000/api/tasks/${selectedTask.task_id}/`);
        const updatedTask = updatedTaskResponse.data;
        await axios.patch(`http://localhost:8000/api/tasks/${selectedTask.task_id}/`, {
          completed_sessions: updatedTask.completed_sessions + 1,
        });
        onTaskUpdate({ ...updatedTask, completed_sessions: updatedTask.completed_sessions + 1 });
        setIsPlaying(false);
        setRemainingTime(duration);
        setKey((prevKey) => prevKey + 1);
        setStartTime(null);
      }
    } catch (error) {
      console.error('Error updating session and task:', error);
    }
  }, [selectedTask, onTaskUpdate, duration, startTime]);

  const handleOpenModal = () => {
    setIsPlaying(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsPlaying(true);
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
    setIsPlaying(true);
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
                  <Button onClick={handleDecrement} color="primary">
                    -
                  </Button>
                  <Button onClick={handleIncrement} color="primary">
                    +
                  </Button>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button onClick={handleSubmit} color="success">
                  Submit
                </Button>
                <Button onClick={handleCloseModal} color="error">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-center text-large mb-4 text-white">Timer</h1>
            {selectedTask && <p className="text-center text-white mb-4">{selectedTask.name}</p>}
            <CountdownCircleTimer
              key={key}
              size={260}
              isPlaying={isPlaying}
              duration={duration}
              initialRemainingTime={remainingTime}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[duration / 2, duration / 4, 10, 0]}
              onComplete={handleTimerComplete}
              onUpdate={(remainingTime) => setRemainingTime(remainingTime)}
            >
              {renderTime}
            </CountdownCircleTimer>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                onClick={() => {
                  setIsPlaying(true);
                  setStartTime(new Date().toISOString());
                }}
                color="primary"
              >
                Start
              </Button>
              <Button
                onClick={async () => {
                  setIsPlaying(false);
                  const stopTime = new Date().toISOString();
                  try {
                    const userId = localStorage.getItem('userId');
                    const response = await axios.post('http://localhost:8000/api/sessions/', {
                      user_id: userId,
                      task_id: selectedTask.task_id,
                      starttime: startTime,
                      endtime: stopTime,
                      date: new Date().toISOString().slice(0, 10),
                    });
                    if (response.status === 201) {
                      setStartTime(null);
                    }
                  } catch (error) {
                    console.error('Error creating session:', error);
                  }
                }}
                color="primary"
              >
                Stop
              </Button>
              <Button onClick={handleOpenModal} color="secondary">
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