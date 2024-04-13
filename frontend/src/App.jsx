import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

export default function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route index element={<LoginPage />} />
					<Route path="/homepage" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/homepage/:userId" element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
