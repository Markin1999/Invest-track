import express, { json } from "express";
import cors from "cors";
import { registrazione } from "./controllers/controllers.js";

const app = express();

app.use(json());
app.use(cors());

app.post("/registrazione", registrazione);

app.listen(5002, () => {
  console.log(`server in ascolto su http://localhost:${5002}`);
});
