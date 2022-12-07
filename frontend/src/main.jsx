import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeContextProvider } from "./context/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Router>
			<ThemeContextProvider>
				<App />
			</ThemeContextProvider>
		</Router>
	</React.StrictMode>
);
