const express = require('express');
const router = express.Router();
const User = require("../modules/users");
const CardBox = require("../modules/cardBox");
const Card = require("../modules/cards");
const Quastion = require("../modules/quastions");
const QuastionBox = require("../modules/quastionBox")
const handlebars = require('express-handlebars');
const path = require('path');

const hbs = handlebars.create({
  defaultLayout: 'layout',
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views')
})

router.get('/', (req, res, next) => {
  res.render('admin/indexAdmin');
})

router.get('/list', function (req, res, next) {
  res.render('admin/list');
})

router.get('/content', function (req, res, next) {
  res.render('admin/content');
})

const findTests = async function(req, res, next){
  req.tests = await QuastionBox.find()
  next()
}

const tests = async function (req, res, next) {
	const template = await hbs.getTemplate( "views/admin/tests.hbs", {
        precompiled: true
    });
    req.testsTemplate = template;
	next();
}

const createShield = async function (req, res, next) {
	const template = await hbs.getTemplate( "views/admin/create_shield.hbs", {
        precompiled: true
    });
    req.createShieldTemplate = template;
	next();
}
const quas = async function (req, res, next) {
	const template = await hbs.getTemplate( "views/admin/quastion.hbs", {
        precompiled: true
    });
    req.quastionTemplate = template;
	next();
}

router.get('/test', quas, createShield ,tests, findTests, function (req, res, next) {
  res.render('admin/test', {
    tests : req.tests,
    testsTemplate: req.testsTemplate,
    createShieldTemplate: req.createShieldTemplate,
    quastionTemplate: req.quastionTemplate
  });
})

router.get('/stats', function (req, res, next) {
  res.render('admin/stats');
})

const findOrCreate = async function(req, res, next){
  let  test = await QuastionBox.findOne({title: req.body.input})
  if(test){
    req.test = test
    next()
  } 
  else{
    newTest = new QuastionBox({title : req.body.input})
    await newTest.save()
    req.test = newTest
    next()
  }
}

router.post("/newtest",findOrCreate, function(req, res){
  res.json({
    input: req.test
  })
})

const create = async function(req, res, next){ 
  console.log(req.body.qu)
  let newQ = new Quastion({title: req.body.qu, answer: req.body.ans, card: req.body.ca, quastionBox: req.body.box })
  console.log(newQ);
  await newQ.save()
  next()
}

router.post("/question", create, function(req, res){
  res.end()
  
} )
module.exports = router;
