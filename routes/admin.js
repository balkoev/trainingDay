const express = require('express');
const router = express.Router();
const CardBox = require('./../modules/cardBox');
const Card = require('./../modules/cards');
const handlebars = require('express-handlebars');
const path = require('path');
// const mongoose = require("mongoose");

// mongoose.connect('mongodb://localhost:27017/supersprint', {
//   useNewUrlParser: true
// });

const hbs = handlebars.create({
  defaultLayout: 'layout',
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views')
})


const exposeTemplate = async function (req, res, next) {
  const template = await hbs.getTemplate("views/admin/newCardbox.hbs", {
    precompiled: true
  });
  const template2 = await hbs.getTemplate("views/admin/cardboxList.hbs", {
    precompiled: true
  });
  const template3 = await hbs.getTemplate("views/admin/newCards.hbs", {
    precompiled: true
  });
  const template4 = await hbs.getTemplate("views/admin/button.hbs", {
    precompiled: true
  });
  res.newCardboxTemplate = template;
  res.cardboxListTemplate = template2;
  res.newcardTemplate = template3;
  res.buttonTemplate = template4;
  next();
}


// ручки для перехода по основному меню!
router.get('/', (req, res, next) => {
  res.render('admin/indexAdmin');
})

router.get('/list', function (req, res, next) {
  res.render('admin/list');
})

router.get('/content', exposeTemplate, async function (req, res, next) {
  let cardbox = await CardBox.find();
  res.render('admin/content', {
    cardbox,
    template: res.newCardboxTemplate,
    template2: res.cardboxListTemplate,
    template3: res.newcardTemplate,
    template4: res.buttonTemplate
  });
})

router.get('/test', function (req, res, next) {
  res.render('admin/test');
})

router.get('/stats', function (req, res, next) {
  res.render('admin/stats');
})
// ----------------------------------------

router.post('/createCardbox', async function (req, res, next) {
  console.log(req.body.title)
  await new CardBox({
    title: req.body.title,
    position: req.body.position
  }).save()
  let cardbox = await CardBox.find();
  res.json(cardbox)
})

router.post('/createCard', async function (req, res, next) {
  await new Card({
    title: req.body.title,
    content: req.body.content,
    cardBox: req.body.cardBox
  }).save()
  let cards = await Card.find();
  res.json(cards)
})

router.get('/content/:category', async function (req, res, next) {
  let cards = await Card.find({cardBox : req.params.category });
  res.render('admin/inCategory', { cards });
})




module.exports = router;
