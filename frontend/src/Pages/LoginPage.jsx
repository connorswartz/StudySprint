import React, { useState } from 'react';
import LoginForm from "../components/LoginForm";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const navigate = useNavigate();

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const login = (email, password) => {
		console.log('Login attempt with:', email, password);
		// Placeholder for actual authentication logic
		setIsLoggedIn(true); // Simulate successful login
		navigate('/homepage');
	  };
	
	  if (isLoggedIn) {
		// Redirect to the main page or handle the logged-in state
		return <div>You are logged in!</div>;
	  }
	
	  return (
		<main className="p-5 flex justify-center items-center min-h-screen">
		  <div className="flex flex-col items-center">
			<LoginForm onLogin={login} />
			<button
			  onClick={() => {
				// Navigate to the registration page
			  }}
			  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
			  Register
			</button>
		  </div>
		</main>
	  );
}

export default LoginPage;