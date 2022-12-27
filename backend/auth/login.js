import { db } from "../db/database.js";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const sessions = {};

export const login = async (req, res) => {
	const { name, password } = req.body;

	if (!name || !password) {
		return res.json({ message: "fill empty fields" });
	} else {
		db.query("SELECT id, name, password FROM users WHERE name = ?", [name], async (err, result) => {
			if (!result[0]) {
				res.json({ message: "incorrect name" });
			} else if (!(await bcrypt.compare(password, result[0].password))) {
				res.json({ message: "incorrect password" });
			} else {
				const sessionToken = uuidv4();
				sessions[sessionToken] = { name, userId: result[0].id };

				const cookieOptions = {
					maxAge: process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
					httpOnly: true,
				};

				res.cookie("session-token", sessionToken, cookieOptions);

				return res.json({ message: "logged in", id: result[0].id });
			}
		});
	}
};
