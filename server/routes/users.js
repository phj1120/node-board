// loaclhost:3000/api/users/

var express = require("express");
var router = express.Router();

// 회원 가입
router.post("/join", async function (req, res, next) {
  var body = req.body;

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
    return;
  }

  // 회원 가입 될 때 까지 대기
  await User.create(body);
  res.json({
    result: "ok",
  });
});

// 로그인
router.post("/login", async function (req, res, next) {
  var user = await User.findOne({
    attributes: ["id", "name"],
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

  // Loing 성공 시 session 에 값 저장
  req.session.user = user;

  res.json({
    result: "ok",
    user: user,
  });
});

// 로그인 된 사용자 정보
router.post("/info", async (req, res) => {
  // 로그인 되어 있을 경우
  if (req.session.user) {
    res.json({
      result: "ok",
      user: req.session.user,
    });
  }

  // 로그인 되어있지 않을 경우
  else {
    res.json({
      result: "fail",
    });
  }
});

// 로그아웃
router.post("/logout", async (req, res) => {
  req.session.destroy();
  res.json({
    result: "ok",
  });
});

module.exports = router;
