const mongoose = require("mongoose")

const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;
const DB = process.env.DB_NAME;

// # Mongo DB connection
const connectToDB = async () => {
  mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log("Successfully connect to MongoDB.");

    })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });

}

module.exports = connectToDB
