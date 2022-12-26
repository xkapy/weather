import { db } from "../db/database.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
	const { name, email, password: passwordRaw, passwordConfirm, city } = req.body;

	if (!name || !email || !passwordRaw || !passwordConfirm || !city) {
		return res.json({ message: "fill empty fields" });
	} else if (passwordRaw !== passwordConfirm) {
		return res.json({ message: "passwords doesn't match" });
	} else {
		db.query("SELECT name FROM users WHERE name = ?", [name], async (err, result) => {
			if (err) {
				throw err;
			} else if (result[0]) {
				return res.json({ message: "existing account" });
			} else {
				const password = await bcrypt.hash(passwordRaw, 10);
				db.query("INSERT INTO users SET ?", { name: name, email: email, password: password, city: city }, (error, results) => {
					if (error) throw error;
					else {
						return res.json({ message: "" });
					}
				});
			}
		});
	}
};
