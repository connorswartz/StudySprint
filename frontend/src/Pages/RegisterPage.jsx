import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const navigate = useNavigate();

	const [isRegistered, setIsRegistered] = useState(false);

	const register = (email, password) => {
		console.log("Registration attempt with:", email, password);
		// Add your registration logic here
		setIsRegistered(true); // Simulate successful registration
	};

	if (isRegistered) {
		// Redirect to the login page or handle the registered state
		navigate("/login");
	}

	return (
		<main className="p-5 flex justify-center items-center min-h-screen">
			<div className="flex flex-col items-center">
				<RegisterForm onRegister={register} />
				<button
					onClick={() => {
						// Navigate to the login page
					}}
					className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
				>
					Back to Login
				</button>
			</div>
		</main>
	);
};

export default RegisterPage;
