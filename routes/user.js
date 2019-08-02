const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../modules/users");
const CardBox = require("../modules/cardBox");
const Card = require("../modules/cards");
const Quastion = require("../modules/quastions");
const QuastionBox = require("../modules/quastionBox")


router.get('/', async (req, res, next) => {
  console.log(req.session.verify);
  res.render('user/indexUser', { verify: req.session.verify });
})
router.get("/test/final", function(req, res, next){
  res.render("user/testFinal", { verify: req.session.verify })
})

router.get("/cards", function(req, res, next){
  res.render("user/cards", { verify: req.session.verify })
})

router.get("/test/train", function(req, res, next){
  res.render("user/testTrain", { verify: req.session.verify })
})


module.exports = router;
