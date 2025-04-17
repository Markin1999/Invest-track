import express, { json } from "express";
import cors from "cors";
import {
  caricaNomeNote,
  deleteFunction,
  getInvestimento,
  getUser,
  login,
  registrazione,
  salvaNote,
  saveForm,
  SezioneInvestimenti,
  takeAllNotes,
  yahooStorico,
  yahooSuggerimenti,
} from "./controllers/controllers.js";
import dotenv from "dotenv";
import passport from "passport";

import "./passport.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(json());
app.use(cors());

app.post("/registrazione", registrazione);
app.post("/login", login);
app.post("/searchNome", yahooSuggerimenti);
app.post("/storico", yahooStorico);
app.post("/saveForm/:user", saveForm);
app.get("/invest/:id", getInvestimento);
app.get("/sezioneI/:id", SezioneInvestimenti);
app.patch("/delete/:id", deleteFunction);
app.post("/takenome/:id", caricaNomeNote);
app.post("/aggiungiNota/:id", salvaNote);
app.get("/allnotes/:id", takeAllNotes);

app.get("/user", passport.authenticate("jwt", { session: false }), getUser);

app.listen(PORT, () => {
  console.log(`server in ascolto su http://localhost:${PORT}`);
});
