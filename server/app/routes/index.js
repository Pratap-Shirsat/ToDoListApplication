const unKnownRoutes = require("./unknown.route");
const taskRoutes = require("./task.route");
const categoryRoutes = require("./category.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.route");

module.exports = {
  unKnownRoutes: unKnownRoutes(),
  taskRoutes: taskRoutes(),
  categoryRoutes: categoryRoutes(),
  userRoutes: userRoutes(),
  authRoutes: authRoutes(),
};
