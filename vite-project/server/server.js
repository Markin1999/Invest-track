import express, { json } from "express";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());

app.listen(5002, () => {
  console.log(`server in ascolto su http://localhost:${5002}`);
});
