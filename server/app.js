var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var options = {
  host: "localhost",
  port: 3306,
  user: "itc801",
  password: "itc801",
  database: "itc_board",
};
// 인증에 대한 정보가 저장 되는 저장소
var sessionStore = new MySQLStore(options);

// Sequelize 클래스 전체
// sequelize DB 에 연결된 객체
// 로 설정해 줌
const { Sequelize } = require("sequelize");

// 전역 변수, 프로그램 어디서든 접속 가능
global.sequelize = new Sequelize("itc_board", "itc801", "itc801", {
  // 'database', 'username', 'password'
  host: "localhost",
  dialect: "mysql",
});

require("./model.js");

var indexRouter = require("./routes/index");
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
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
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
