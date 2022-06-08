// localhost:3000/api/board

var express = require("express");
var router = express.Router();
var Pager = require("node-jyh-pager");
var pager = new Pager({
  itemPerPage: 5,
});

router.post("/list", async function (req, res, next) {
  var page = req.body.page;
  if (!page) {
    page = 1;
  }
  var itemPerPage = 5;
  var offset = pager.getSkip(page);

  var boardList = await Board.findAll({
    // join 해서 가져와라
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

// router.post("/list", async function (req, res, next) {
//   var page = req.body.page;
//   if (!page) {
//     page = 1;
//   }
//   var itemPerPage = 5;
//   var offset = (page - 1) * itemPerPage;

//   var boardList = await Board.findAll({
//     limit: itemPerPage,
//     orders: [["writeTime", "DESC"]],
//     offset: offset,
//   });

//   var count = await Board.count();
//   var pageCount = Math.ceil(count / itemPerPage);
//   res.json({
//     boardList: boardList,
//     pageCount: pageCount,
//   });

// 콜 백
// Board.findAll().then((boardList) => {
//   res.json(boardList);
// });

// 하드 코딩
//   var boardList = [
//   {id:"1", title:"제목1", writer:"박현준"},
//   {id:"2", title:"제목2", writer:"박현준"},
//   {id:"3", title:"제목3", writer:"박현준"}]
//   res.json(boardList)
// });

module.exports = router;

router.post("/write", async function (req, res, next) {
  if (req.session.user) {
    req.body.userId = req.session.user.id;
  }

  var body = req.body;
  console.log("body", body);

  var result = await Board.create(body);
  res.json({
    result: "ok",
  });
  return;
});

router.post("/item", async function (req, res) {
  var bno = req.body.bno;

  var board = await Board.findOne({
    where: {
      bno: bno,
    },
    // model.js 에서 belongsTo 정의 해줬기에 ㄱㄴ
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

router.post("/remove", async (req, res) => {
  var bno = req.body.bno;

  if (!req.session.user) {
    return res.json({
      result: "fail",
      msg: "로그인이 필요합니다.",
    });
  }

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
  console.log(board);
});

router.post("/modify", async (req, res) => {
  var bno = req.body.bno;

  if (!req.session.user) {
    return res.json({
      result: "fail",
      msg: "로그인이 필요합니다.",
    });
  }

  var board = await Board.findOne({
    where: {
      bno: bno,
    },
  });

  console.log("-------");
  console.log(board.userId);
  console.log(req.session.user.id);
  console.log("-------");

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
    console.log("-------");
    res.json({
      result: "fail",
      msg: "수정할 수 있는 권한이 없습니다.",
    });
  }
  console.log(board);
});
