import bcrypt from "bcrypt";
import { db } from "../initDb.js";

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
