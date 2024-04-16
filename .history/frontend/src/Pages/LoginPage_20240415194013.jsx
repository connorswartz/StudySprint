import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const login = async (username, password) => {
		try {
			const response = await axios.post(
			"http://localhost:8000/api/login/",
			{ username, password }
			);
			console.log("Login response:", response.data);
			if (response.data.success) {
				setIsLoggedIn(true);
				localStorage.setItem("userId", response.data.user_id);
				navigate(`/homepage`);
			} else {
				setErrorMessage("Incorrect username or password");
			}
		} catch (error) {
			console.error("Login error:", error);
			setErrorMessage("Incorrect username or password");
		}
	};

	if (isLoggedIn) {
		// Redirect to the main page or handle the logged-in state
		return <div>You are logged in!</div>;
	}

	return (
		<main className="p-5 flex justify-center items-center min-h-screen">
			<div className="flex flex-col items-center">
			<LoginForm onLogin={login} />
			{errorMessage && (
				<div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
				{errorMessage}
				</div>
			)}
			<button
				onClick={() => {
				navigate("/register");
				}}
				className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Register
			</button>
			</div>
		</main>
	  );
};

export default LoginPage;
