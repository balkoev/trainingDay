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

const find = async function(req, res, next){

  let user = await User.findOne({telephone:req.session.mobile}, {_id: 0, position:1})
  let test = await QuastionBox.find({position: user.position})
  console.log(test)
  req.test = test
  next()
}
router.get("/test/final", find, function(req, res, next){
  res.render("user/testFinal", {
    test: req.test
  })
})

//-----------------------------
router.get("/cards", async function(req, res, next){
  let cardbox = await CardBox.find();
  res.render("user/userContent", { cardbox })
})
//-----------------------------

router.get("/test/train", function(req, res, next){
  res.render("user/testTrain")
})
 router.get("/test/final/:name", async function(req, res){
   let quastionBox = await QuastionBox.findOne({title:req.params.name})
   let quastions = await Quastion.find({quastionBox:quastionBox.title})
   console.log(quastions)
   res.render("user/testStart", {
     name: req.params.name,
     length: quastions.length
   })
  })

module.exports = router;
