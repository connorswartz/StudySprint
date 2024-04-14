import React from 'react';
import { useNavigate } from 'react-router-dom';
import TimerCard from "../components/TimerCard";
import TaskCard from "../components/TaskCard";
import GoalCard from "../components/GoalCard";

const HomePage = () => {
	const navigate = useNavigate();

	const handleNavigation = (path) => {
		navigate(path);
	};

	const navbarStyle = {
		backgroundColor: '#242424', // Light grey background
		textAlign: 'center',
		position: 'fixed',
		bottom: 0,
		left: 0,
		right: 0,
		padding: '10px 0'
	};

	const buttonStyle = {
		backgroundColor: '#007bff', // Standard blue background
		color: 'white',
		fontSize: '1rem', // Larger font size for bigger buttons
		padding: '10px 20px',
		margin: '0 8px',
		border: 'none', // No border
	};

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
			{/* Bottom Navbar */}
			<div style={navbarStyle}>
				<button onClick={() => handleNavigation('/profilepage')} style={buttonStyle}>
					Profile
				</button>
				<button onClick={() => handleNavigation('/homepage')} style={buttonStyle}>
					Home 
				</button>
				<button onClick={() => handleNavigation('/performancereport')} style={buttonStyle}>
					Report
				</button>
			</div>
		</main>
	);
};

export default HomePage;
