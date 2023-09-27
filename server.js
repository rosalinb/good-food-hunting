// find the .env file and load the variables defined as environment variables
require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const requestLogger = require("./middlewares/request_logger");
const reqBodyMethodOverride = require("./middlewares/req_body_method_override");
const setCurrentUser = require("./middlewares/set_current_user");
const session = require("express-session");
const dishesRouter = require("./routes/dishes_routes");
const sessionsRouter = require("./routes/sessions_routes");
const pagesRouter = require("./routes/pages_routes");
const usersRouter = require("./routes/users_routes");

const app = express();
const port = process.env.PORT || 8080;

app.set("view engine", "ejs");

// == middlewares ================================

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // parse req body
app.use(reqBodyMethodOverride);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mistyrose",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(setCurrentUser);
app.use(requestLogger);
app.use(expressLayouts);

// == routes ======================================

app.use("/", pagesRouter);
app.use("/", sessionsRouter);
app.use("/dishes", dishesRouter);
app.use("/", usersRouter);

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
