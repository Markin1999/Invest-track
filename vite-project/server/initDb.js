import pgPromise from "pg-promise";

export const db = pgPromise()(
  "postgres://postgres:Lggs290@localhost:5432/Invest-track"
);

const setup = async () => {
  try {
    await db.none(`
      
      -- Tabella utenti
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        nome TEXT NOT NULL,
        cognome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        token TEXT 
      );

CREATE TABLE IF NOT EXISTS investments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  nome TEXT NOT NULL,
  quantita NUMERIC NOT NULL,
  Prezzo_Azione NUMERIC NOT NULL,
  totale NUMERIC NOT NULL
);


CREATE TABLE IF NOT EXISTS totalInvestment (
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
nome TEXT NOT NULL,
quantita_totale NUMERIC NOT NULL,
prezzoMedio NUMERIC NOT NULL,
totaleInvestito NUMERIC NOT NULL,
prezzoGiornaliero NUMERIC NOT NULL,
differenzaPercentuale NUMERIC NOT NULL,
guadagno NUMERIC NOT NULL,
contatore INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS notes (
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
invest_id INTEGER NOT NULL REFERENCES totalinvestment(id) ON DELETE CASCADE,
title TEXT NOT NULL,
contenuto TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

    `);

    console.log("Tabelle create correttamente");
  } catch (error) {
    console.error("Errore durante la creazione delle tabelle:", error.message);
  }
};

setup();
