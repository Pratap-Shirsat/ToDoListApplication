const unKnownRoutes = require("./unknown.route");
const taskRoutes = require("./task.route");
const categoryRoutes = require("./category.routes");

module.exports = {
  unKnownRoutes: unKnownRoutes(),
  taskRoutes: taskRoutes(),
  categoryRoutes: categoryRoutes(),
};
