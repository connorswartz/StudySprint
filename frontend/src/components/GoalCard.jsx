import { useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

const GoalCard = () => {
	return (
		<Card>
			<h1 className="text-center mt-2 text-large">Daily Goal</h1>
			<p className="text-center text-default-500 text-small">
				Completed: 0 minutes
			</p>
			<CardBody>
				<p>Placeholder text</p>
				<CardFooter>Placeholder text</CardFooter>
			</CardBody>
		</Card>
	);
};

export default GoalCard;
