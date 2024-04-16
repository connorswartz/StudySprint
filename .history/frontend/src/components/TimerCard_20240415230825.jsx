import React, { useState, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Card, CardBody, Button } from '@nextui-org/react';
import axios from 'axios';
import PropTypes from 'prop-types';

const TimerCard = ({ selectedTask }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);

    useEffect(() => {
      let timer;
    
      if (isPlaying) {
        timer = setInterval(() => {
          setDuration((prevDuration) => prevDuration - 1);
        }, 1000);
      }
    
      if (duration === 0) {
        clearInterval(timer);
        setIsPlaying(false);
        handleTimerComplete();
      }
    
      return () => {
        clearInterval(timer);
      };
    }, [isPlaying, duration, handleTimerComplete]);

    const handleTimerComplete = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.post('http://localhost:8000/api/sessions/', {
          user_id: userId,
          task_id: selectedTask.task_id,
          starttime: new Date().toISOString(),
          endtime: new Date().toISOString(),
          date: new Date().toISOString().slice(0, 10),
        });
    
        if (response.status === 201) {
          await axios.patch(`http://localhost:8000/api/tasks/${selectedTask.task_id}/`, {
            completed_sessions: selectedTask.completed_sessions + 1,
          });
          setDuration(5); // Reset the duration to its initial value
        }
      } catch (error) {
        console.error('Error updating session and task:', error);
      }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleIncrement = () => {
        setDuration(duration + 5);
    };

    const handleDecrement = () => {
        if (duration > 5) {
            setDuration(duration - 5);
        }
    };

    const handleSubmit = () => {
        setShowModal(false);
        setIsPlaying(true);
    };

    const renderTime = ({ remainingTime }) => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        return (
            <div className="flex items-center justify-center">
                <div className="text-3xl font-bold">{minutes}:</div>
                <div className="text-3xl font-bold">
                    {seconds < 10 ? `0${seconds}` : seconds}
                </div>
            </div>
        );
    };

    return (
        <Card className="flex-1" style={{ flexGrow: 1.7 }}>
            <CardBody className="items-center">
                {showModal ? (
                    <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-900 rounded-lg shadow-lg">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4 text-center text-white">
                                Timer Settings
                            </h2>
                            <div className="mb-4">
                                <p className="text-center text-white">
                                    Duration: {duration} minutes
                                </p>
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
                        {selectedTask && (
                            <p className="text-center text-white mb-4">{selectedTask.name}</p>
                        )}
                        <CountdownCircleTimer
                            size={260}
                            isPlaying={isPlaying}
                            duration={duration * 60}
                            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                            colorsTime={[7, 5, 2, 0]}
                            onComplete={handleTimerComplete}
                        >
                            {renderTime}
                        </CountdownCircleTimer>
                        <div className="flex justify-center gap-4 mt-4">
                            <Button
                                onClick={() => setIsPlaying(!isPlaying)}
                                color="primary"
                            >
                                {isPlaying ? 'Stop' : 'Start'}
                            </Button>
                            <Button onClick={() => setShowModal(true)} color="secondary">
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
};

export default TimerCard;