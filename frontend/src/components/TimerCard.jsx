import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card, CardBody } from "@nextui-org/react";

const TimerCard = () => {
	return (
		<Card className="flex-1" style={{ flexGrow: 1.7 }}>
			<CardBody className="items-center">
				<h1 className="text-center text-large mb-11">Timer Card</h1>
				<CountdownCircleTimer
					size={260}
					isPlaying={true}
					duration={60}
					colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
					colorsTime={[7, 5, 2, 0]}
				>
					{({ remainingTime }) => remainingTime}
				</CountdownCircleTimer>
				<p className="text-center">
					Make beautiful websites regardless of your design
					experience.
				</p>
			</CardBody>
		</Card>
	);
};

export default TimerCard;
