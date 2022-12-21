import express from "express";
const app = express();
const PORT = process.env.PORT;

import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { db } from "./db/database.js";

db.connect((error) => {
	if (error) console.log("Cannot connect to database");
	else console.log("Connected to database");
});

app.use(cors());

app.get("/", (req, res) => {
	res.json({ message: "welcome" });
});

app.listen(PORT, (error) => {
	if (error) throw error;
	console.log(`app is running on port ${PORT}`);
});
