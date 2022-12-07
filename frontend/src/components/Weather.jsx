import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { BiTimeFive, BiDroplet, BiWind, BiDownload, BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

const Weather = () => {
	const [weather, setWeather] = useState();
	const [time, setTime] = useState(new Date());
	const [city, setCity] = useState("New York");
	const [message, setMessage] = useState("");

	const formRef = useRef();

	const operator = useMemo(() => {
		let op = "";
		if (weather === undefined) {
			return "Etc/GMT+0";
		}
		if (weather.timezone / 3600 < 0) {
			op = `Etc/GMT+${Math.abs(weather.timezone / 3600)}`;
		} else if (weather.timezone / 3600 > 0) {
			op = `Etc/GMT-${weather.timezone / 3600}`;
		} else if (weather.timezone == 0) {
			op = "Etc/GMT+0";
		}

		return op;
	}, [weather]);

	const clock = useMemo(
		() =>
			new Intl.DateTimeFormat("pl", {
				timeStyle: "short",
				timeZone: operator,
			}).format(time),
		[time, operator]
	);

	useEffect(() => {
		if (!city) {
			return;
		}
		const controller = new AbortController();

		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d8bbc30f35a10a28d22aaea01aef61c3`, {
			signal: controller.signal,
		})
			.then((res) => {
				if (!res.ok) {
					setMessage("City not found");
					throw new Error();
				}
				return res.json();
			})
			.then((data) => {
				setCity("");
				setMessage("");
				setWeather(data);
				setTime(new Date());
			})
			.catch(() => console.log("City not found"));

		return () => controller.abort();
	}, [city]);

	useEffect(() => {
		const timeInterval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(timeInterval);
	}, [weather]);

	if (!weather) {
		return <></>;
	}

	const formSubmitHandler = (event) => {
		event.preventDefault();
		setCity(formRef.current.value);
		event.target.reset();
	};

	return (
		<main className="main">
			<section className="motto">
				<h2>You can search for the weather all over the world really simply.</h2>
				<div className="motto-links">
					<Link to="/register">Join us</Link>
					<Link to="/">Contact us</Link>
				</div>
			</section>
			<section className="card">
				<h2 className="city">{weather && <p>{weather.name}</p>}</h2>
				<div className="time">
					<div className="time-icon">
						<BiTimeFive size={30} />
					</div>
					<p>{clock}</p>
				</div>
				<div className="params">
					<h2 className="params-temp">{weather.main.temp} °C</h2>
					<div className="params-weather">
						<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather" className="icon" />
						<div className="params-weather-desc">{weather.weather[0].description}</div>
					</div>
					<div className="params-specs">
						<div className="params-specs-box">
							<BiDownload />
							<p>{weather.main.pressure} hPa</p>
						</div>
						<div className="params-specs-box">
							<BiDroplet />
							<p>{weather.main.humidity}%</p>
						</div>
						<div className="params-specs-box">
							<BiWind />
							<p>{weather.wind.speed} km/h</p>
						</div>
					</div>
				</div>
				<form className="form" onSubmit={formSubmitHandler}>
					<input type="text" className="form-search" placeholder={message || "Search"} ref={formRef} />
					<button type="submit" className="form-button">
						<BiSearch />
					</button>
				</form>
			</section>
		</main>
	);
};

export default Weather;
