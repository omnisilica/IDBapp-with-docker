const fs = require("fs");
const yaml = require("js-yaml");
const mongoose = require("mongoose");
const serverConfig = require("../../../config/server-config.json");
// Custom
const dotenv = require("dotenv").config();

const NAME = "[db-connecton]";
const configLocation = serverConfig.mongoConfig;

function getMongoUrl() {
  let url = undefined;

  // read yaml config file to get the set ports and bind ip.
  try {
    const config = yaml.load(fs.readFileSync(configLocation, "utf-8"));
    // build mongodb connection string
    url = `mongodb://${config.net.bindIp}:${config.net.port}`;
  } catch (error) {
    console.error(
      `[db-connection]: Reading config file for database ${configLocation} failed!\n${error}`
    );
  }

  return url;
}

function connect() {
  // const url = getMongoUrl();
  const url = process.env.DB_CONNECTION;

  if (url) {
    try {
      mongoose.connect(url, {
        serverSelectionTimeoutMS: 10000, // Timeout after 10s instead of 30s
      });
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }

    const dbConnection = mongoose.connection;

    dbConnection.once("open", () => {
      console.log(`${NAME} Database connected at: ${url}`);
    });

    dbConnection.on("error", (error) => {
      console.error(`${NAME} Database connection error: ${error}`);
    });

    dbConnection.on("close", () => {
      console.log(`${NAME} Database connection closed.`);
    });

    return dbConnection;
  } else {
    throw new Error(
      `${NAME} url undefined check that ${configLocation} exists.`
    );
  }
}

module.exports = { connect, getMongoUrl };
