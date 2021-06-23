const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/user/userRouter");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
//parsing form data/incoming data
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

module.exports = app;
