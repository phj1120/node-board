// localhost:3000/api/board

var express = require("express");
var router = express.Router();

var Pager = require("node-jyh-pager"); // 페이징을 위한 라이브러리
var pager = new Pager({
  itemPerPage: 5,
});

// 게시글 목록 조회 
router.post("/list", async function (req, res, next) {
  var page = req.body.page;
  if (!page) {
    page = 1;
  }
  var itemPerPage = 5;
  var offset = pager.getSkip(page);

  var boardList = await Board.findAll({
    include: {
      model: User,
      as: "writeUser",
    },
    limit: itemPerPage,
    order: [["writeTime", "DESC"]],
    offset: offset,
  });

  var count = await Board.count();
  var nav = pager.getBottomNav(page, count);
  var pageCount = nav.totalPage;

  res.json({
    boardList: boardList,
    pageCount: pageCount,
  });
});

// 게시글 상세 조회
router.post("/item", async function (req, res) {
  var bno = req.body.bno;

  var board = await Board.findOne({
    where: {
      bno: bno,
    },
    include: {
      model: User,
      as: "writeUser",
      attributes: ["id", "name"],
    },
  });
  res.json({
    board: board,
  });
});

// 게시글 작성
router.post("/write", async function (req, res, next) {
  if (req.session.user) {
    req.body.userId = req.session.user.id;
  }

  var body = req.body;

  var result = await Board.create(body);
  res.json({
    result: "ok",
  });
  return;
});


// 게시글 삭제
router.post("/remove", async (req, res) => {
  var bno = req.body.bno;

  // 로그인 확인
  if (!req.session.user) {
    return res.json({
      result: "fail",
      msg: "로그인이 필요합니다.",
    });
  }

  // 게시글 정보 조회
  var board = await Board.findOne({
    where: {
      bno: bno,
    },
  });

  // 로그인된 사용자와 삭제하려는 게시물의 작성자가 같은지 확인
  if (board.userId == req.session.user.id) {
    await Board.destroy({
      where: {
        bno: bno,
      },
    });
    res.json({
      result: "ok",
    });
  } else {
    return res.json({
      result: "fail",
      msg: "삭제할 수 있는 권한이 없습니다.",
    });
  }
});

// 게시글 수정
router.post("/modify", async (req, res) => {
  var bno = req.body.bno;

  // 로그인 확인
  if (!req.session.user) {
    return res.json({
      result: "fail",
      msg: "로그인이 필요합니다.",
    });
  }

  // 게시글 정보 조회
  var board = await Board.findOne({
    where: {
      bno: bno,
    },
  });

  // 로그인된 사용자와 수정하려는 게시물의 작성자가 같은지 확인
  if (board.userId == req.session.user.id) {
    await Board.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: {
          bno: bno,
        },
      }
    );
    res.json({
      result: "ok",
    });
  } else {
    res.json({
      result: "fail",
      msg: "수정할 수 있는 권한이 없습니다.",
    });
  }
});

module.exports = router;
