require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  unKnownRoutes,
  taskRoutes,
  categoryRoutes,
  userRoutes,
  authRoutes,
} = require("./app/routes/index");
const logger = require("./app/helpers/logger");
const dbConnection = require("./app/db/db.config");

dbConnection();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.get("/", (req, res) =>
  res.status(200).send("Welcome to the ToDoList NodeJs service!")
);
app.use("/task", taskRoutes);
app.use("/category", categoryRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use(unKnownRoutes);

const nodePort = process.env.NODE_PORT || 4545;
const server = app.listen(nodePort, () => {
  logger.info(`ToDoList service started on Port ${nodePort}.`);
});
