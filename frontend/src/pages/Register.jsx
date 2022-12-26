import React, { useState } from "react";
import Axios from "axios";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { RiLockPasswordLine, RiUser3Line, RiHome2Line } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { TbRepeat } from "react-icons/tb";
import useFetch from "../hooks/useFetch";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [city, setCity] = useState("");
	const [regStatus, setRegStatus] = useState("");

	const url = import.meta.env.VITE_APP_URL;

	const [temp, setTemp] = useState("Antarctica");
	const { data, loading, error } = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${temp}&units=metric&appid=d8bbc30f35a10a28d22aaea01aef61c3`);

	if (loading) return <div>loading</div>;
	if (error) console.log(error);

	const register = (e) => {
		e.preventDefault();

		Axios.post(`${url}/register`, {
			name: name,
			email: email,
			password: password,
			passwordConfirm: passwordConfirm,
			city: city,
		}).then((response) => {
			setRegStatus(response.data.message);
		});
	};

	return (
		<Layout>
			<section className="register">
				<div className="register-side">
					<header>
						<h2>Did you know that it's {data && <span>{data.main.temp}&nbsp;°C</span>} in Antarctica right now?</h2>
					</header>
				</div>
				<form className="register-form">
					<header className="register-form-header">
						<h2>Register</h2>
					</header>
					<label htmlFor="name" className="register-form-label">
						<RiUser3Line />
						<input onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder="username" />
					</label>
					<label htmlFor="email" className="register-form-label">
						<HiOutlineMail />
						<input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="email" />
					</label>
					<label htmlFor="password" className="register-form-label">
						<RiLockPasswordLine />
						<input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="password" />
					</label>
					<label htmlFor="confirmPassword" className="register-form-label">
						<TbRepeat />
						<input onChange={(e) => setPasswordConfirm(e.target.value)} type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" />
					</label>
					<label htmlFor="city" className="register-form-label">
						<RiHome2Line />
						<input onChange={(e) => setCity(e.target.value)} type="text" name="city" id="city" placeholder="your city" />
					</label>
					<span className="register-form-message">{regStatus}</span>
					<button onClick={register} className="register-form-button" type="submit">
						sign up
					</button>
					<p className="register-form-already">
						Already have accout? <Link to="/login">log in</Link>
					</p>
				</form>
			</section>
		</Layout>
	);
};

export default Register;
