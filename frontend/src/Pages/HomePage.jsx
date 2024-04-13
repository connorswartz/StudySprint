import TimerCard from "../components/TimerCard";
import TaskCard from "../components/TaskCard";
import GoalCard from "../components/GoalCard";

const HomePage = () => {
	return (
		<main className="p-5">
			<h1 className="text-center text-3xl">StudySprint</h1>
			<div className="flex flex-col md:flex-row gap-5 mt-5">
				<TimerCard />
				<div className="flex flex-col flex-1 gap-5">
					<TaskCard />
					<GoalCard />
				</div>
			</div>
		</main>
	);
};

export default HomePage;
