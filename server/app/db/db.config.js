const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_Connection_URL)
    .then(() => console.log("Connected to MongoDB Successfully!"))
    .catch((err) =>
      console.log(`Error occured while connecting to mongoDb: ${err}`)
    );
};

module.exports = dbConnection;
