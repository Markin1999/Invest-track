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

      -- Tabella Investimenti
      CREATE TABLE IF NOT EXISTS investments (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      company TEXT NOT NULL,
      invested_amount NUMERIC(12,2) NOT NULL,
      quantity INTEGER NOT NULL,
      average_price NUMERIC(12,2),
      created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("Tabelle create correttamente");
  } catch (error) {
    console.error("Errore durante la creazione delle tabelle:", error.message);
  }
};

setup();
