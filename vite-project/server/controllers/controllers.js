import bcrypt from "bcrypt";
import { db } from "../initDb.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { SECRET = "" } = process.env;

export const registrazione = async (req, res) => {
  const { nome, cognome, email, password } = req.body;

  try {
    const existEmail = await db.oneOrNone(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (existEmail) {
      return res.status(409).json({ message: "L'utente è già registrato" });
    }

    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = await db.one(
      `INSERT INTO users (nome, cognome, email, password) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id`,
      [nome, cognome, email, hashed]
    );

    res
      .status(201)
      .json({ message: "Utente creato con successo", userId: user.id });
  } catch (error) {
    console.error("Errore durante la registrazione:", error);
    res.status(500).json({ message: "Errore durante la registrazione" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.oneOrNone(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);

    if (!user) {
      return res.status(400).json({ message: "Utente non trovato!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password errata" });
    }

    const payload = { id: user.id, email };

    let token;

    try {
      token = jwt.sign(payload, SECRET);

      await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token]);
    } catch (err) {
      console.error("❌ Errore generazione token:", err.message);
      return res
        .status(500)
        .json({ message: "Errore nella generazione del token" });
    }

    console.log("✅ Token generato:", token);

    return res.status(200).json({
      id: user.id,
      email,
      token,
    });
  } catch (error) {
    console.error("💥 Errore login:", error);
    return res.status(500).json({ message: error.message });
  }
};
