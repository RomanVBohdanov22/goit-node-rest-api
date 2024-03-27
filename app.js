import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js"; //"./routes/api/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("api/contacts", contactsRouter); ///api/contacts

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

/*
app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});*/

/*const DB_HOST =
  "mongodb+srv://<user>:<password>@atlascluster.3uloymf.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=AtlasCluster"; */

const { DB_HOST, PORT = 3000 } = process.env;
console.log(DB_HOST);
mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT), console.log("Database connection successful"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
