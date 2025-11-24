const express = require("express");
const app = express();
const todosRouter = require("./routers/todos");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/todos", todosRouter);

module.exports = app;
export{}