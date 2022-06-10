var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res) {
  // console.log(req.cookies);
  // res.cookie("test", "test");
  // req.session.test = "test";
  res.json(req.query);
});

module.exports = router;
