var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const catalogRouter = require("./routes/catalog");
const passport = require("passport");
const session = require("express-session");
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
});

mongoose.set("strictQuery", false);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(limiter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const mongodb = process.env.MONGODB_URL;

(async () => {
  try {
    await mongoose.connect(mongodb);
  } catch (err) {
    console.error("Unable to connect with database", err);
  }
})();

//helmet
app.use(
  helmet.contentSecurityPolicy({
    directives:{
      "script-src":["'self", "cdnjs.cloudflare.com", "fonts.googleapis.com", "unpkg.com", "'unsafe-inline'"],
    },
  })
);

//compression
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/blog", catalogRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
