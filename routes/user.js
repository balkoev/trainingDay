const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../modules/users");
const CardBox = require("../modules/cardBox");
const Card = require("../modules/cards");
const Quastion = require("../modules/quastions");
const Stat = require("../modules/statics");
const QuastionBox = require("../modules/quastionBox")
const handlebars = require('express-handlebars');
const path = require('path');


const hbs = handlebars.create({
  defaultLayout: 'layout',
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views')
})

router.get('/', async (req, res, next) => {
  console.log(req.session.verify);
  res.render('user/indexUser', { verify: req.session.verify });
})


const find = async function(req, res, next){


  let user = await User.findOne({ telephone: req.session.mobile }, { _id: 0, position: 1 })
  let test = await QuastionBox.find({ position: user.position })
  console.log(test)
  req.test = test
  next()
}


const findBase = async function(req,res,next){
  let base = await CardBox.find()
  req.base = base
  next()
}

router.get("/test/final", find, function(req, res, next){
  res.render("user/testFinal", {
    test: req.test
  })
})


router.get("/cards",findBase, function(req, res, next){
  console.log(req.base)
  res.render("user/cards", { verify: req.session.verify ,base: req.base})
})


router.get("/test/train", function(req, res, next){
  req.session.try = false;
  res.redirect("user/test/final")
})

const theTemplate = async function (req, res, next) {
  const template = await hbs.getTemplate("views/user/theTest.hbs", {
    precompiled: true
  });
  req.theTest = template;
  next()
}

const myTest = async function (req, res, next) {
  const template = await hbs.getTemplate("views/user/myTest.hbs", {
    precompiled: true
  });
  req.myTest = template;
  next()
}

const score = async function (req, res, next) {
  const template = await hbs.getTemplate("views/user/score.hbs", {
    precompiled: true
  });
  req.score = template;
  next()
}


router.get("/test/final/:name", score, myTest, theTemplate, async function (req, res) {
  let quastionBox = await QuastionBox.findOne({ title: req.params.name })
  let quastions = await Quastion.find({ quastionBox: quastionBox.title })
  res.render("user/testStart", {
    name: req.params.name,
    length: quastions.length,
    theTest: req.theTest,
    myTest: req.myTest,
    score: req.score
  })
})



const sheet = async function (req, res, next) {
  let quastions = await Quastion.find({ quastionBox: req.params.name })
  let answers = [...quastions[0].answer];
  req.qua = quastions[0].title
  if (answers.length > 1) {
    req.filter = 1;
  }
  else {
    req.filter = 0
  }
  let wrongAnswers = [];
  for (let i = 0; i < quastions.length; i++) {
    if (i !== 0) {
      wrongAnswers.push(...quastions[i].answer)
    }
  }
  let random1 = Math.round(Math.random() * (quastions.length - 0) + 0)
  let random2 = Math.round(Math.random() * (quastions.length - 0) + 0)
  let random3 = Math.round(Math.random() * (quastions.length - 0) + 0)
  answers.push(wrongAnswers[random1])
  answers.push(wrongAnswers[random2])
  answers.push(wrongAnswers[random3])
  answers = answers.sort(func);
  function func(a, b) {
    return 0.5 - Math.random();
  }
  req.answer = answers
  next()
}

router.post("/test/final/:name", sheet, async function (req, res) {
  let quastions = await Quastion.find({ quastionBox: req.params.name })
  let arr = []
  for (let i = 1; i < quastions.length + 1; i++) {
    arr.push(i)
  }
  res.json({
    quastions: arr,
    answer: req.answer,
    filter: req.filter,
    qua: req.qua
  });
})

const sheet2 = async function (req, res, next) {
  try {
    let quastions = await Quastion.find({ quastionBox: req.params.name })
    let answers = [...quastions[req.body.num].answer];
    req.qua = quastions[req.body.num].title
    if (answers.length > 1) {
      req.filter = 1;
    }
    else {
      req.filter = 0
    }
    let wrongAnswers = [];
    for (let i = 0; i < quastions.length; i++) {
      if (i !== req.body.num) {
        wrongAnswers.push(...quastions[i].answer)
      }
    }
    let random1 = Math.round(Math.random() * (quastions.length - 0) + 0)
    let random2 = Math.round(Math.random() * (quastions.length - 0) + 0)
    let random3 = Math.round(Math.random() * (quastions.length - 0) + 0)
    answers.push(wrongAnswers[random1])
    answers.push(wrongAnswers[random2])
    answers.push(wrongAnswers[random3])
    answers = answers.sort(func);
    function func(a, b) {
      return 0.5 - Math.random();
    }
    req.answer = answers
    next()
  } catch (err) {
    console.warn(err)
  }
}



const counter = async function (req, res, next) {
  try {
    let quastions = await Quastion.find({ quastionBox: req.params.name })
    let qu = quastions[req.body.num - 1].answer
    if (req.body.last.length == qu.length) {
      for (let i = 0; i < req.body.last.length; i++) {
        if (qu.indexOf(req.body.last[i]) != -1) {
          req.counter = 1;
        }
        else {
          req.counter = 0;
          return next()
        }
      }
    }
    else {
      req.counter = 0;
    }
    return next()
  } catch (err) {
    console.warn(err)
  }
}

router.post("/test/final/start/:name", counter, sheet2, async function (req, res) {
  try {
    console.log("111")
    let quastions = await Quastion.find({ quastionBox: req.params.name })
    let arr = []
    for (let i = 1; i < quastions.length + 1; i++) {
      arr.push(i)
    }
    res.json({
      quastions: arr,
      answer: req.answer,
      filter: req.filter,
      qua: req.qua,
      counter: req.counter
    });
  } catch (err) {
    console.warn(err)
  }

})


const createSt = async function (req, res, next) {
  req.body.count += req.counter
  let st = new Stat({ user: req.session.mobile, qb: req.params.name, counter: req.body.count })
  req.st = st
  if(req.session.try){
    await st.save();
  }
  req.session.try = true;
  next()
}


router.post("/test/final/count/:name", counter, createSt, async function (req, res) {
  res.json({ static: req.st })
})


module.exports = router;
