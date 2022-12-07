import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.svg";
import Mode from "../Mode";
import { Turn as Hamburger } from "hamburger-react";

const Nav = () => {
	const [showMenu, setShowMenu] = useState("hidden");
	const [expandNav, setExpandNav] = useState("normal");
	const [resize, setResize] = useState();
	const [resizeTimer, setResizeTimer] = useState();

	const show = () => {
		if (showMenu === "hidden") {
			setShowMenu("shown");
			setExpandNav("expand");
		} else {
			setShowMenu("hidden");
			setExpandNav("normal");
		}
	};

	useEffect(() => {
		window.addEventListener("resize", () => {
			setResize("animation-stop");
			setResizeTimer(
				setTimeout(() => {
					setResize("");
				}, 400)
			);
		});

		return () => clearTimeout(resizeTimer);
	}, []);

	return (
		<nav className={`nav ${expandNav}`}>
			<p className="nav-title">
				<Link to="/">
					<img src={Logo} />
					weather
				</Link>
			</p>
			<div className={`nav-links ${showMenu} ${resize}`}>
				<ul className={`nav-links-bar`}>
					<li className="home-button">
						<Link to="/">home</Link>
					</li>
					<li className="about-button">
						<Link to="/">about</Link>
					</li>
					<li className="theme-icon">
						<Mode />
					</li>
				</ul>
				<div className="login-button">
					<Link to="/login">login</Link>
				</div>
			</div>
			<div className="nav-burger" onClick={show}>
				<Hamburger duration={0.3} rounded size={25} distance="sm" />
			</div>
		</nav>
	);
};

export default Nav;
