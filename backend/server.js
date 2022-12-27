import express from "express";
const app = express();
const PORT = process.env.PORT;

import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { db } from "./db/database.js";
import { register } from "./auth/register.js";
import { login } from "./auth/login.js";

db.connect((error) => {
	if (error) throw error;
	else console.log("Connected to database");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/register", register);
app.post("/login", login);

app.listen(PORT, (error) => {
	if (error) throw error;
	console.log(`app is running on port ${PORT}`);
});
