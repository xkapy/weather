import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./sass/App.scss";

export default function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}
