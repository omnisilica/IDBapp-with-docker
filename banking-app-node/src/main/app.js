const express = require("express");
// Local imports
const cors = require("cors");
const swaggerDefinitions = require("../../docs/swagger/swagger-definitions");
const server = require("../../config/server-config.json");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dbConnect = require("./utils/db-connection");
const mongoDbSession = require("connect-mongodb-session")(session);

// Middleware
const audit = require("express-requests-logger");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// Routes
const accountRouter = require("./controllers/account-controller");
const { userRouter, userController } = require("./controllers/user-controller");
const employeeRouter = require("./controllers/employee-controller");
const roleRouter = require("./controllers/role-controller");
const { mortgageRouter } = require("./controllers/mortgage-controller");
const beneficiaryRouter = require("./controllers/beneficiary-controller");
const transactionRouter = require("./routes/transaction-routes");

const app = express();
// enable cors
app.use(cors());
// add swagger middleware
const swaggerOptions = {
  failOnErrors: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IDB API",
      version: "1.0.0",
      description: "API for IDB data access and manipulation",
    },
    components: {
      schemas: swaggerDefinitions,
    },
    servers: [
      {
        url: `http://localhost:${server.port}`,
        description: "Development server",
      },
    ],
  },
  apis: ["docs/swagger/*.yaml"], // path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// temporary request/response logger
app.use(
  audit({
    excludeURLs: ["health", "metrics"], // Exclude paths which enclude 'health' & 'metrics'
    request: {
      maskBody: ["password"], // Mask 'password' field in incoming requests
      excludeHeaders: ["authorization"], // Exclude 'authorization' header from requests
      excludeBody: ["creditCard"], // Exclude 'creditCard' field from requests body
      maskHeaders: ["header1"], // Mask 'header1' header in incoming requests
      maxBodyLength: 50, // limit length to 50 chars + '...'
    },
    response: {
      maskBody: ["session_token"], // Mask 'session_token' field in response body
      excludeHeaders: ["*"], // Exclude all headers from responses,
      excludeBody: ["*"], // Exclude all body from responses
      maskHeaders: ["header1"], // Mask 'header1' header in incoming requests
      maxBodyLength: 50, // limit length to 50 chars + '...'
    },
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

//set up the store for sessions
const store = mongoDbSession({
  uri: dbConnect.getMongoUrl(),
  collection: "sessions",
});

// Session middleware setup
app.use(
  session({
    secret: "your_secret_key", // use this as an example, can change it later
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create a session until something is stored
    store: MongoStore.create({
      // Use Mongo for session store
      mongoUrl: dbConnect.getMongoUrl(), // Reuse the MongoDB connection URL getter
      collectionName: "sessions", // Specify the collection to store sessions
    }),
    cookie: {
      maxAge: 1000 * 60 * 10, // 10 minutes
      httpOnly: true, // Prevent client-side access to cookie
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: "strict", // Strict same-site policy to prevent CSRF
    },
  })
);

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error("Session expired or invalid")); // Handle session timeout
  }
  next();
});

// Health check endpoint
app.get("/", (request, response) => {
  // response.send("<h1>Hello World from Bank App</h1>");
  console.log(request.session);
  response.send("<h1>Hello World from Bank App</h1>");
});

// Route definitions
app.use("/mortgages", mortgageRouter);
app.use("/customers", userRouter);
app.use("/beneficiaries/customer", beneficiaryRouter);
app.use("/transactions", transactionRouter);

// Login route with timeout
app.post(
  "/login",
  function (req, res, next) {
    req.setTimeout(600000); // set timeout to 10 minutes
    userController.loginUser(req, res, next);
  },
  function (err, req, res, next) {
    if (err.code === "ETIMEDOUT") {
      // Handle timeout error
      res.status(408).json({ message: "Login request timed out" });
    } else {
      next(err);
    }
  }
);

app.post("/logout", function (req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to log out.");
    }

    res.send("Logged out successfully.");
  });
});

// Routes for '/accounts'
app.use("/accounts", accountRouter);

app.use("/employee", employeeRouter);

app.use("/role", roleRouter);
app.use("/accounts", accountRouter);
module.exports = app;
