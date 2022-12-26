import { db } from "../db/database.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "./.env" });

export const login = async (req, res) => {
	const { name, password } = req.body;

	if (!name || !password) {
		return res.json({ message: "fill empty fields" });
	} else {
		db.query("SELECT `name` FROM users WHERE `name` = ?", [name], async (err, result) => {
			if (err) {
				throw err;
			} else if (
				!result[0] ||
				(await bcrypt.compare(result[0].password, password, (err) => {
					console.log(result[0]);
				}))
			) {
				return res.json({ message: "incorrect username or password" });
			} else {
				const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
					expiresIn: process.env.JWT_EXPIRES,
					httpOnly: true,
				});

				const cookieOptions = {
					expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
					httpOnly: true,
				};

				res.cookie("userRegistered", token, cookieOptions);

				return res.json({ message: "user logged in" });
			}
		});
	}
};
