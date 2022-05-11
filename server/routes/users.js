// loaclhost:3000/api/users/

var express = require("express");
// const { UPSERT } = require('sequelize/types/query-types'); // 자동으로 require 되어 오류 발생
var router = express.Router();

router.get("/test", function (req, res, next) {
  res.json({
    result: "respond with a resource",
  });
});

// async / await 으로 구현
// await 으로 쓰려면 함수가 async 여야 함
// 완료 될 때 까지 대기
router.post("/join", async function (req, res, next) {
  var body = req.body;
  console.log(body);

  // 아래로 내려가지 않고 결과값이 올 때까지 대기
  var alreadyUser = await User.findOne({
    where: {
      id: body.id,
    },
  });

  if (alreadyUser != null) {
    res.json({
      result: "fail",
      message: "이미 존재하는 아이디입니다.",
    });
    console.log(alreadyUser);
    return;
  }

  var result = await User.create(body);
  res.json({
    result: "ok",
  });
});

router.post("/login", async function (req, res, next) {
  var body = req.body;
  console.log(body);

  var user = await User.findOne({
    where: {
      id: req.body.id,
      password: req.body.password,
    },
  });

  if (user == null) {
    res.json({
      result: "fail",
      message: "아이디 또는 비밀번호가 잘 못 되었습니다.",
    });
    return;
  }

  res.json({
    result: "ok",
  });
});

// then으로 구현
// 해당 내용이 완료가 된 경우 실행.
// https://velog.io/@delilah/Node.js-%EB%B9%84%EB%8F%99%EA%B8%B0-Promise-%EB%8F%99%EC%9E%91%EC%9B%90%EB%A6%AC
// router.post("/join", function (req, res, next) {
//   var body = req.body;
//   User.create(body)
//     .then(() => res.status(200).json({ result: "ok" }))
//     // 예외 처리 (http://expressjs.com/ko/advanced/best-practice-performance.html#promises)
//     .catch((e) => {
//       if ((e.errno = 1026)) {
//         res
//           .status(400)
//           .json({ result: "err", message: "primary-key-duplicate-error" });
//       }
//     });
// });

// router.post("/login", async function (req, res, next) {
//   var body = req.body;
//   console.log(body);
//   User.findOne({
//     where: {
//       id: req.body.id,
//       password: req.body.password,
//     },
//   }).then((user) => {
//     if (user === null) {
//       console.log("User Not Found");
//       res.status(200).json({
//         result: "fail",
//         message: "아이디 또는 비밀번호가 잘 못 되었습니다.",
//       });
//     } else {
//       console.log("Login Success");
//       res.status(200).json({ result: "ok" });
//     }
//   });
// });

module.exports = router;
