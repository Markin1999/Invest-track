import bcrypt from "bcrypt";
import { db } from "../initDb.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import yahooFinance from "yahoo-finance2";

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

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const userLogged = await db.oneOrNone(
      `SELECT nome, cognome FROM users WHERE id = $1 `,
      [userId]
    );

    if (userLogged) {
      return res.status(200).json(userLogged);
    }

    return res.status(404).json({ message: "Utente non trovato" });
  } catch (error) {
    res.status(500).json({ message: "errore nella richiesta", error });
  }
};

export const yahooSuggerimenti = async (req, res) => {
  const { nome } = req.body;
  try {
    const risultati = await yahooFinance.search(nome);
    if (risultati) {
      return res.status(200).json(risultati);
    } else {
      return res.status(404).json({ message: "Nessun risultato trovato" });
    }
  } catch (error) {
    console.error("Errore:", error);
    return res.status(500).json({ error: "Errore nella ricerca" });
  }
};

export const yahooStorico = async (req, res) => {
  const { nome, data, ora } = req.body;

  console.log("▶️ Dati ricevuti:", { nome, data, ora });

  if (!nome || !data || !ora) {
    return res.status(400).json({ error: "Dati mancanti" });
  }

  const from = new Date(`${data}T00:00:00`);
  const to = new Date(`${data}T23:59:59`);
  const targetMillis = new Date(`${data}T${ora}`).getTime();

  try {
    let result = await yahooFinance.chart(nome, {
      period1: from,
      period2: to,
      interval: "5m",
    });

    let prezzi = result?.indicators?.quote?.[0];
    let timestamps = result?.timestamp;

    if (!prezzi || !timestamps || timestamps.length === 0) {
      console.log("⏳ Nessun dato con 5m. Provo con 1d...");

      result = await yahooFinance.chart(nome, {
        period1: from,
        period2: to,
        interval: "1d",
      });

      if (result.quotes && result.quotes.length > 0) {
        const storico = result.quotes.map((q) => ({
          date: new Date(q.date),
          open: q.open,
          close: q.close,
          high: q.high,
          low: q.low,
          volume: q.volume,
        }));

        const piùVicino = storico.reduce((prev, curr) =>
          Math.abs(curr.date.getTime() - targetMillis) <
          Math.abs(prev.date.getTime() - targetMillis)
            ? curr
            : prev
        );

        return res.status(200).json({ ...piùVicino, intervallo: "1d" });
      } else {
        return res.status(404).json({
          message: "Dati storici non disponibili (anche con intervallo 1d).",
        });
      }
    }
  } catch (error) {
    console.error("❌ Errore durante la richiesta storica:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Errore storico Yahoo" });
  }
};
