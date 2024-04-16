import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card, CardBody, Button } from "@nextui-org/react";
import React, { useState } from "react";

const TimerCard = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(5); // Default duration set to 5 minutes
	const [showModal, setShowModal] = useState(false);
	const [completedSessions, setCompletedSessions] = useState(0);

	const handleTimerComplete = () => {
		setCompletedSessions(completedSessions + 1);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleIncrement = () => {
		setDuration(duration + 5); // Increment by 5 minutes
	};

	const handleDecrement = () => {
		if (duration > 5) {
			setDuration(duration - 5); // Decrement by 5 minutes
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
									<Button
										onClick={handleDecrement}
										color="primary"
									>
										-
									</Button>
									<Button
										onClick={handleIncrement}
										color="primary"
									>
										+
									</Button>
								</div>
							</div>
							<div className="flex justify-center gap-4">
								<Button onClick={handleSubmit} color="success">
									Submit
								</Button>
								<Button
									onClick={handleCloseModal}
									color="error"
								>
									Cancel
								</Button>
							</div>
						</div>
					</div>
				) : (
					<>
						<h1 className="text-center text-large mb-11 text-white">
							Timer Card
						</h1>
						<CountdownCircleTimer
							size={260}
							isPlaying={isPlaying}
							duration={duration * 60} // Convert minutes to seconds
							colors={[
								"#004777",
								"#F7B801",
								"#A30000",
								"#A30000",
							]}
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
								{isPlaying ? "Stop" : "Start"}
							</Button>
							<Button
								onClick={() => setShowModal(true)}
								color="secondary"
							>
								Settings
							</Button>
						</div>
					</>
				)}
			</CardBody>
		</Card>
	);
};

export default TimerCard;
