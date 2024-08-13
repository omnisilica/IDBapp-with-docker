const app = require("./src/main/app");
const server = require("./config/server-config.json");
const sitemap = require("express-sitemap-html");
const mongooseClient = require("./src/main/utils/db-connection");

const PNAME = '[server]';

// connect to database
let dbConnection = mongooseClient.connect();

// start server
app.listen(server.port, () => {
    console.log(`${PNAME} Server is running at http://localhost:${server.port}`);
    console.log(`${PNAME} Documented route definitions can be seen at http://localhost:${server.port}/api-docs/`);
});

// clean up on exits
process.on('SIGINT', () => {
    dbConnection.close();
    console.log(`${PNAME} Caught interrupt signal and shutting down.`);
    process.exit(0);
});
