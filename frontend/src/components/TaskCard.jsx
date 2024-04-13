import React from "react";
import { useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { ListboxWrapper } from "../components/ListboxWrapper";
import { Listbox, ListboxItem } from "@nextui-org/react";

const TaskCard = () => {
	const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

	const selectedValue = React.useMemo(
		() => Array.from(selectedKeys).join(", "),
		[selectedKeys]
	);
	return (
		<Card>
			<h1 className="text-center mt-2 text-large">Select a Task</h1>
			<CardBody className="items-center">
				<div>
					<ListboxWrapper style={{ width: "100%" }}>
						<Listbox
							aria-label="Single selection example"
							variant="flat"
							disallowEmptySelection
							selectionMode="single"
							selectedKeys={selectedKeys}
							onSelectionChange={setSelectedKeys}
						>
							<ListboxItem key="l1">CPSC471</ListboxItem>
							<ListboxItem key="l2">Business</ListboxItem>
							<ListboxItem key="l3">SENG300</ListboxItem>
							<ListboxItem key="l4">Single Date</ListboxItem>
							<ListboxItem key="l5">Iteration</ListboxItem>
						</Listbox>
					</ListboxWrapper>
					<p className="text-small text-default-500">
						Selected value: {selectedValue}
					</p>
				</div>
			</CardBody>
		</Card>
	);
};

export default TaskCard;
