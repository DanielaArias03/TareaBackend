import "dotenv/config.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import petsRoutes from "./routes/pets.routes.js";
import { dbConnection } from "./config/db.js";
import RateLimit from "./Middlewares/rateLimit/rateLimit.middleware.js";
import ownersRoutes from "./routes/owners.routes.js";

const app = express();
// app.get("/", (req, res) => {
//   res.send("Prueba del Get");
// });

app.use(cors());
app.use(bodyParser());
app.use(RateLimit);

app.use("/pets", petsRoutes);
app.use("/owners", ownersRoutes);

try {
  dbConnection.authenticate();
  console.log("Connected to DB");
} catch (error) {
  console.log(error);
}

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
