import React from "react";
import { Card, Modal, Button, Text } from "@nextui-org/react";

const TimerSettingsModal = ({
	visible,
	closeHandler,
	duration,
	setDuration,
}) => {
	const handleIncrement = () => {
		setDuration(duration + 60);
	};

	const handleDecrement = () => {}

};
