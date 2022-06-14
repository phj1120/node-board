var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// mysql, session
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var options = {
  host: "127.0.0.1",
  port: 3306,
  user: "itc801",
  password: "itc801",
  database: "itc_board",
};
var sessionStore = new MySQLStore(options);
const { Sequelize } = require("sequelize");

global.sequelize = new Sequelize("itc_board", "itc801", "itc801", { // 'database', 'username', 'password'
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});

require("./model.js");
var usersRouter = require("./routes/users");
var boardRouter = require("./routes/board");

var app = express();
app.use(
  session({
    key: "session_key", // 쿠키에 저장할 세션 id 이름
    secret: "session_cookie_secret", // 암호화 할 때 secret 을 같이 넣어 암호화
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/dist"))); // client build 된 파일 위치
app.use("/api/users", usersRouter);
app.use("/api/board", boardRouter);

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
