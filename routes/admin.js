const express = require('express');
const router = express.Router();
const Cardbox = require('./../models/cardbox');
const Card = require('./../models/card');


const exposeTemplate = async function (req, res, next) {
  const template = await hbs.getTemplate("views/admin/newCardbox.hbs", {
      precompiled: true
  });
  const template2 = await hbs.getTemplate("views/admin/newCards.hbs", {
      precompiled: true
  });
  res.newCardboxTemplate = template;
  res.newCardsTemplate = template2;
  next();
}


// ручки для перехода по основному меню!
router.get('/', exposeTemplate, (req, res, next) => {
  let cardbox = await Card.find();
  res.render('admin/indexAdmin', {
    cardbox,
    template: res.newCardboxTemplate,
    template2: res.newCardsTemplate
  });
})

router.get('/list', function (req, res, next) {
  res.render('admin/list');
})

router.get('/content', function (req, res, next) {
  res.render('admin/content');
})

router.get('/test', function (req, res, next) {
  res.render('admin/test');
})

router.get('/stats', function (req, res, next) {
  res.render('admin/stats');
})
// ----------------------------------------





module.exports = router;
