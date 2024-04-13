import React from "react";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const register = async (username, email, password, accountType, parentUsername) => {
    try {
      const response = await axios.post("http://localhost:8000/api/register/", {
        username,
        email,
        password,
        accountType,
        parentUsername,
      });
      console.log("Registration response:", response.data);

      if (response.data.success) {
        // Registration successful, navigate to the login page
        navigate("/login");
      } else {
        // Handle registration failure, display an error message, etc.
        console.log("Registration failed:", response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Handle registration error, display an error message, etc.
    }
  };

  return (
    <main className="p-5 flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <RegisterForm onRegister={register} />
        <button
          onClick={() => {
            // Navigate to the login page
            navigate("/login");
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
