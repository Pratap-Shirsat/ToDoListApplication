const unKnownRoutes = require("./unknown.route");
const taskRoutes = require("./task.route");
const categoryRoutes = require("./category.routes");
const userRoutes = require("./user.routes");

module.exports = {
  unKnownRoutes: unKnownRoutes(),
  taskRoutes: taskRoutes(),
  categoryRoutes: categoryRoutes(),
  userRoutes: userRoutes(),
};
