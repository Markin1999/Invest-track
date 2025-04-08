import pgPromise from "pg-promise";

export const db = pgPromise()(
  "postgres://postgres:Lggs290@localhost:5432/Invest-track"
);

const setup = async () => {
  try {
    await db.none(`
      
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        nome TEXT,
        cognome TEXT,
        email TEXT UNIQUE,
        password TEXT,
        token TEXT
      );
    `);

    console.log("Tabelle create correttamente");
  } catch (error) {
    console.error("Errore durante la creazione delle tabelle:", error.message);
  }
};

setup();
