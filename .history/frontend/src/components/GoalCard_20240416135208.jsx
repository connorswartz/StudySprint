import { React, useState } from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";

const GoalCard = () => {
	return (
		<Card>
			<h1 className="text-center mt-2 text-large">Daily Goal</h1>
			<p className="text-center text-default-500 text-small">
				
			</p>
			<CardBody>
			<Progress
      size="sm"
      radius="sm"
      classNames={{
        base: "max-w-md",
        track: "drop-shadow-md border border-default",
        indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
        label: "tracking-wider font-medium text-default-600",
        value: "text-foreground/60",
      }}
      label="Minutes Comp"
      value={65}
      showValueLabel={true}
    />
			</CardBody>
		</Card>
	);
};

export default GoalCard;
