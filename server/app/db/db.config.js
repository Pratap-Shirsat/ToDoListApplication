const mongoose = require("mongoose");
const logger = require("../helpers/logger");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_Connection_URL)
    .then(() => logger.info("Connected to MongoDB Successfully!"))
    .catch((err) =>
      logger.error(`Error occured while connecting to mongoDb: ${err}`)
    );
};

module.exports = dbConnection;
