import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card, CardBody, Button, Modal, ModalBody, ModalHeader } from "@nextui-org/react";
import React, { useState } from "react";

const TimerCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const handleTimerComplete = () => {
    setCompletedSessions(completedSessions + 1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleIncrement = () => {
    setDuration(duration + 60);
  };

  const handleDecrement = () => {
    if (duration > 60) {
      setDuration(duration - 60);
    }
  };

  const renderModal = () => (
    <Modal
      blur
      closeButton
      preventClose
      aria-labelledby="modal-title"
      open={showModal}
      onClose={handleCloseModal}
    >
      <ModalHeader>
        <h1 id="modal-title" size={18}>
          Timer Settings
        </h1>
      </ModalHeader>
      <ModalBody>
        <Card>
          <Card.Body>
            <h1>Duration: {duration / 60} minutes</h1>
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={handleDecrement}>-</Button>
              <Button onClick={handleIncrement}>+</Button>
            </div>
          </Card.Body>
        </Card>
      </ModalBody>
    </Modal>
  );

  return (
    <Card className="flex-1" style={{ flexGrow: 1.7 }}>
      <CardBody className="items-center">
        <h1 className="text-center text-large mb-11">Timer Card</h1>
        <CountdownCircleTimer
          size={260}
          isPlaying={isPlaying}
          duration={duration}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          onComplete={handleTimerComplete}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
        <p className="text-center">
          Make beautiful websites regardless of your design experience.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? "Stop" : "Start"}
          </Button>
          <Button onClick={() => setShowModal(true)}>Settings</Button>
        </div>
      </CardBody>
      {showModal && renderModal()}
    </Card>
  );
};

export default TimerCard;