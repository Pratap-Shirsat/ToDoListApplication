require("dotenv").config();
const express = require("express");
const {
  unKnownRoutes,
  taskRoutes,
  categoryRoutes,
} = require("./app/routes/index");
const dbConnection = require("./app/db/db.config");

dbConnection();
const app = express();
app.use(express.json());

app.get("/", (req, res) =>
  res.status(200).send("Welcome to the ToDoList NodeJs service!")
);
app.use("/task", taskRoutes);
app.use("/category", categoryRoutes);
app.use(unKnownRoutes);

const nodePort = process.env.NODE_PORT || 4545;
const server = app.listen(nodePort, () => {
  console.log(`ToDoList service started on Port ${nodePort}.`);
});
