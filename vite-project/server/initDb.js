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
  quantita INTEGER NOT NULL,
  Prezzo_Azione REAL NOT NULL,
  totale REAL NOT NULL
);

    `);

    console.log("Tabelle create correttamente");
  } catch (error) {
    console.error("Errore durante la creazione delle tabelle:", error.message);
  }
};

setup();
