import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card, CardBody, Button, Modal } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

const TimerCard = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(60);
	const [showModal, setShowModal] = useState(false);
	const [completedSessions, setCompletedSessions] = useState(0);

	// function for backend sending completed sessions

	const handleTimerComplete = () => {
		setCompletedSessions(completedSessions + 1);
	};

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
				<div className="flex justify-center gap-4 mt-4">
					<Button onPress={() => setIsPlaying(!isPlaying)}>
						{isPlaying ? "Stop" : "Start"}
					</Button>
					<Button onPress={() => setShowModal(true)}>Settings</Button>
				</div>
			</CardBody>
		</Card>
	);
};

export default TimerCard;
