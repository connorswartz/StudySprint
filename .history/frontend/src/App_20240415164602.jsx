import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import PerformanceReportPage from "./Pages/PerformanceReportPage";
import ProfilePage from "./Pages/ProfilePage";
// 

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
					//
					<Route path="/profilepage" element={<ProfilePage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
