import React from "react";
import Layout from "../components/layout/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RiLockPasswordLine, RiUser3Line, RiHome2Line } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { TbRepeat } from "react-icons/tb";
import useFetch from "../hooks/useFetch";

const Register = () => {
	const [city, setCity] = useState("Antarctica");

	const { data, loading, error } = useFetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d8bbc30f35a10a28d22aaea01aef61c3`);

	if (loading) return <div>loading</div>;
	if (error) console.log(error);

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
						<input type="text" name="name" id="name" placeholder="username" />
					</label>
					<label htmlFor="email" className="register-form-label">
						<HiOutlineMail />
						<input type="email" name="email" id="email" placeholder="email" />
					</label>
					<label htmlFor="password" className="register-form-label">
						<RiLockPasswordLine />
						<input type="password" name="password" id="password" placeholder="password" />
					</label>
					<label htmlFor="confirmPassword" className="register-form-label">
						<TbRepeat />
						<input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password" />
					</label>
					<label htmlFor="city" className="register-form-label">
						<RiHome2Line />
						<input type="text" name="city" id="city" placeholder="your city" />
					</label>
					<button className="register-form-button" type="submit">
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
