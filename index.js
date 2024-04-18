const express = require("express");
const bodyParser = require("body-parser");
const dbConfig = require("./src/config/database.config");
const dotenv = require("dotenv");
const userRoute = require("./src/routes/authRoutes");
const { register, login } = require("./src/controllers/authController");
const mongoose = require("mongoose");

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use("/auth", userRoute);

app.use("/auth/register", register);
app.use("/auth/login", login);

mongoose
  .connect(dbConfig.url, {})
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

  app.listen(5000, () => {
    console.log(
      ` server listening on port ${process.env.PORT} `,
      "\n",
      ` http://localhost:${process.env.PORT}/ `
    );
  });
