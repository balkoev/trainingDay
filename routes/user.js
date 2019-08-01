const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../modules/users");
const CardBox = require("../modules/cardBox");
const Card = require("../modules/cards");
const Quastion = require("../modules/quastions");
const QuastionBox = require("../modules/quastionBox")



router.get('/', async (req, res, next) => {
  res.render('user/indexUser');
})
router.get("/test/final", function(req, res, next){
  res.render("user/testFinal")
})

router.get("/cards", function(req, res, next){
  res.render("user/cards")
})

router.get("/test/train", function(req, res, next){
  res.render("user/testTrain")
})


module.exports = router;
