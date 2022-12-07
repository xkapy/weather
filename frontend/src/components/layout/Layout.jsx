import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = ({ children }) => {
	const { isDark } = useContext(ThemeContext);

	return (
		<div className="container" id={isDark ? "dark" : "light"}>
			<Nav />
			<div className="content">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
