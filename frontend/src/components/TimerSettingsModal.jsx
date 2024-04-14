import React from "react";
import { Card, Modal, Button } from "@nextui-org/react";

const TimerSettingsModal = ({
	visible,
	closeHandler,
	duration,
	setDuration,
}) => {
	const handleIncrement = () => {
		setDuration(duration + 60);
	};

	const handleDecrement = () => {
		if (duration > 60) {
			setDuration(duration - 60);
		}
	};

	return (
		<Modal
			blur
			closeButton
			preventClose
			aria-labelledby="modal-title"
			open={visible}
			onClose={closeHandler}
		>
			<Modal.Header>
				<h1 id="modal-title" size={18}>
					Timer Settings
				</h1>
			</Modal.Header>
			<Modal.Body>
				<Card>
					<Card.Body>
						<h1>Duration: {duration / 60} minutes</h1>
						<div className="flex justify-center gap-4 mt-4">
							<Button onClick={handleDecrement}>-</Button>
							<Button onClick={handleIncrement}>+</Button>
						</div>
					</Card.Body>
				</Card>
			</Modal.Body>
		</Modal>
	);
};

export default TimerSettingsModal;
