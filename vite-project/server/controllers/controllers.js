import bcrypt from "bcrypt";
import { db } from "../initDb.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import yahooFinance from "yahoo-finance2";

yahooFinance.suppressNotices(["yahooSurvey"]);

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
      `SELECT id, nome, cognome FROM users WHERE id = $1 `,
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

export const takeAllNotes = async (req, res) => {
  try {
    const userId = req.params.id;

    const notes = await db.any(
      `SELECT title,contenuto, created_at FROM notes WHERE user_id = $1 `,
      [userId]
    );

    if (notes) {
      return res.status(200).json(notes);
    }

    return res.status(404).json({ message: "Note non trovate" });
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
  const { nome, data } = req.body;

  if (!nome || !data) {
    return res.status(400).json({
      message: "Dati mancanti",
    });
  }

  const from = new Date(`${data}T00:00:00`);
  const to = new Date(`${data}T23:59:59`);
  const targetMillis = new Date(`${data}T23:59:59`).getTime();

  try {
    let result = await yahooFinance.chart(nome, {
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
  } catch (error) {
    console.error("❌ Errore durante la richiesta storica:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Errore storico Yahoo" });
  }
};

export const saveForm = async (req, res) => {
  const { user } = req.params;
  const { data } = req.body;

  if (!user || !data) {
    return res.status(400).json({ message: "Dati mancanti" });
  }

  try {
    const result = await db.oneOrNone(
      `SELECT * FROM totalInvestment WHERE user_id = $1 AND nome = $2`,
      [user, data.nome]
    );

    if (!result) {
      const quote = await yahooFinance.quote(data.nome);
      const prezzoGiornaliero = quote.regularMarketPrice;
      const guadagno = (prezzoGiornaliero - data.Prezzo_Azione) * data.quantita;
      const contatore = 1;

      const differenzaPercentuale =
        ((prezzoGiornaliero - data.Prezzo_Azione) / data.Prezzo_Azione) * 100;

      await db.one(
        `INSERT INTO totalInvestment (user_id, nome, quantita_totale, prezzoMedio, totaleInvestito, prezzoGiornaliero, differenzaPercentuale, guadagno, contatore) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [
          user,
          data.nome,
          data.quantita,
          data.Prezzo_Azione,
          data.totale,
          prezzoGiornaliero,
          differenzaPercentuale,
          guadagno,
          contatore,
        ]
      );
    } else {
      console.log(result);
      const quantitaVecchia = parseFloat(result.quantita_totale);
      const prezzoMedioVecchio = parseFloat(result.prezzomedio);
      const totaleInvestitoVecchio = parseFloat(result.totaleinvestito);
      const contatore = parseInt(result.contatore);

      const quantitaNuova = parseFloat(data.quantita);
      const prezzoNuovo = parseFloat(data.Prezzo_Azione);
      const totaleNuovo = parseFloat(data.totale);

      const nuovaQuantita = quantitaVecchia + quantitaNuova;
      const nuovoTotaleInvestito = totaleInvestitoVecchio + totaleNuovo;

      const nuovoPrezzoMedio = nuovoTotaleInvestito / nuovaQuantita;

      const quote = await yahooFinance.quote(data.nome);
      const prezzoGiornaliero = quote.regularMarketPrice;

      const valoreAttuale = prezzoGiornaliero * nuovaQuantita;
      const guadagno = nuovaQuantita * prezzoGiornaliero - nuovoTotaleInvestito;
      const differenzaPercentuale =
        ((valoreAttuale - nuovoTotaleInvestito) / nuovoTotaleInvestito) * 100;

      await db.none(
        `UPDATE totalInvestment SET 
             quantita_totale = $1,
             prezzoMedio = $2,
             totaleInvestito = $3,
             prezzoGiornaliero = $4,
             differenzaPercentuale = $5,
             guadagno = $6,
             contatore = $7
           WHERE user_id = $8 AND nome = $9`,
        [
          nuovaQuantita,
          nuovoPrezzoMedio,
          nuovoTotaleInvestito,
          prezzoGiornaliero,
          differenzaPercentuale,
          guadagno,
          contatore + 1,
          user,
          data.nome,
        ]
      );
    }

    await db.one(
      `INSERT INTO investments (user_id, date, nome, quantita, Prezzo_Azione, totale )VALUES ($1, $2, $3, $4, $5, $6) RETURNING id `,
      [
        user,
        data.date,
        data.nome,
        data.quantita,
        data.Prezzo_Azione,
        data.totale,
      ]
    );

    res.status(200).json({ message: "Dati inseriti con successo" });
  } catch (error) {
    console.error("Riprova, i dati non sono stati caricati", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Errore nel caricamento" });
  }
};

export const getInvestimento = async (req, res) => {
  try {
    const userId = req.params.id;

    const userLogged = await db.any(
      `SELECT * FROM totalInvestment WHERE user_id = $1 `,
      [userId]
    );

    if (userLogged) {
      return res.status(200).json(userLogged);
    }

    return res.status(404).json({ message: "Dati non trovati" });
  } catch (error) {
    res.status(500).json({ message: "errore nella richiesta", error });
  }
};

export const SezioneInvestimenti = async (req, res) => {
  const userId = req.params.id;
  try {
    const investment = await db.any(
      `SELECT * FROM investments WHERE user_id=$1`,
      [userId]
    );

    if (investment) {
      return res.status(200).json(investment);
    }
    return res.status(404).json({ message: "Dati non trovati" });
  } catch (error) {
    res.status(500).json({ message: "errore nella richiesta", error });
  }
};

export const deleteFunction = async (req, res) => {
  const userId = req.params.id;
  const { element, users } = req.body;

  try {
    const selectAll = await db.any(
      `SELECT * FROM totalinvestment WHERE nome = $1 AND user_id = $2`,
      [element.nome, users]
    );

    if (!selectAll.length) {
      console.log("⚠️ Nessun investimento trovato");
      return res.status(404).json({ message: "Nessun investimento trovato" });
    }

    const selectAllSum = selectAll[0];

    await db.none(`DELETE FROM investments WHERE id = $1 AND user_id = $2`, [
      userId,
      users,
    ]);

    const nuovaQuantita = selectAllSum.quantita_totale - element.quantita;

    if (nuovaQuantita > 0) {
      const nuovoTotaleInvestito =
        selectAllSum.totaleinvestito - element.totale;
      const contatore = selectAllSum.contatore - 1;

      const quote = await yahooFinance.quote(element.nome);
      const prezzoGiornaliero = quote.regularMarketPrice;

      const valoreAttuale = prezzoGiornaliero * nuovaQuantita;
      const nuovoPrezzoMedio = nuovoTotaleInvestito / nuovaQuantita;
      const guadagno = valoreAttuale - nuovoTotaleInvestito;
      const differenzaPercentuale =
        ((valoreAttuale - nuovoTotaleInvestito) / nuovoTotaleInvestito) * 100;

      await db.none(
        `UPDATE totalinvestment SET 
           quantita_totale = $1,
           prezzomedio = $2,
           totaleinvestito = $3,
           prezzogiornaliero = $4,
           differenzapercentuale = $5,
           guadagno = $6,
           contatore = $7
         WHERE user_id = $8 AND nome = $9`,
        [
          nuovaQuantita,
          nuovoPrezzoMedio,
          nuovoTotaleInvestito,
          prezzoGiornaliero,
          differenzaPercentuale,
          guadagno,
          contatore,
          users,
          element.nome,
        ]
      );
    } else {
      await db.none(
        `DELETE FROM totalinvestment WHERE nome = $1 AND user_id = $2`,
        [element.nome, users]
      );
    }

    res.status(200).json({ message: "Elemento eliminato con successo" });
  } catch (error) {
    console.error(" Errore nell'eliminazione:", error);
    res.status(500).json({ message: "errore nell'eliminazione'", error });
  }
};

export const caricaNomeNote = async (req, res) => {
  const id_Inv = req.body.index;
  const users_id = req.params.id;
  try {
    const response = await db.one(
      `SELECT * FROM totalinvestment WHERE id = $1 AND user_id=$2`,
      [id_Inv, users_id]
    );

    return res.status(200).json(response.nome);
  } catch (error) {
    console.error(" Errore nel caricamento del nome", error);
    res
      .status(500)
      .json({ message: "errore nel caricamento del nome'", error });
  }
};

export const salvaNote = async (req, res) => {
  const nome = req.body.nome;
  const nota = req.body.nota;
  const id_Inv = req.body.index;
  const users_id = req.params.id;

  try {
    const response = await db.one(
      `INSERT INTO notes (user_id, invest_id, title, contenuto) VALUES ($1, $2, $3, $4) RETURNING id`,
      [users_id, id_Inv, nome, nota]
    );

    return res.status(200).json(response);
  } catch (error) {
    console.error(" Errore nel salvataggio", error);
    res.status(500).json({ message: "errore nel salvataggio'", error });
  }
};
