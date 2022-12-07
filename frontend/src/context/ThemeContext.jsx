import { createContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	const [isDark, setIsDark] = useState(true);

	const toggleTheme = () => {
		setIsDark((previous) => !previous);
	};

	return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
