import React from "react";
import Axios from "axios";
import Layout from "../components/layout/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RiLockPasswordLine, RiUser3Line, RiHome2Line } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { TbRepeat } from "react-icons/tb";
import useFetch from "../hooks/useFetch";

const Login = () => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState("");

	const url = import.meta.env.VITE_APP_URL;

	const [temp, setTemp] = useState("Honolulu");
	const { data, loading, error } = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${temp}&units=metric&appid=d8bbc30f35a10a28d22aaea01aef61c3`);

	if (loading) return <div>loading</div>;
	if (error) console.log(error);

	const login = (e) => {
		e.preventDefault();

		Axios.post(`${url}/login`, {
			name: name,
			password: password,
		}).then((response) => {
			setLoginStatus(response.data.message);
		});
	};

	return (
		<Layout>
			<section className="login">
				<div className="login-side">
					<header>
						<h2>Did you know that it's {data && <span>{data.main.temp}&nbsp;°C</span>} in Honolulu right now?</h2>
					</header>
				</div>
				<form className="login-form">
					<header className="login-form-header">
						<h2>Login</h2>
					</header>
					<label htmlFor="name" className="login-form-label">
						<RiUser3Line />
						<input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder="username" />
					</label>
					<label htmlFor="password" className="login-form-label">
						<RiLockPasswordLine />
						<input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="password" />
					</label>
					<button onClick={login} className="login-form-button" type="submit">
						log in
					</button>
					<p className="login-form-already">
						Don't have accout? <Link to="/register">Sign up</Link>
					</p>
				</form>
			</section>
		</Layout>
	);
};

export default Login;
