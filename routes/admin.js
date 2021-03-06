const express = require('express');
const router = express.Router();
const User = require("../modules/users");
const CardBox = require("../modules/cardBox");
const Card = require("../modules/cards");
const Quastion = require("../modules/quastions");
const QuastionBox = require("../modules/quastionBox")
const handlebars = require('express-handlebars');
const path = require('path');
const Stat = require("../modules/statics");



const hbs = handlebars.create( {
	defaultLayout: 'layout',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views')
});

// const userProfile = async function (req, res, next) {
// 	const template = await hbs.getTemplate( "views/admin/userProfile.hbs", {
//         precompiled: true
//     });
//     req.userTemp = template;
// 	next();
// }
const listTemp = async function (req, res, next) {
	const template = await hbs.getTemplate( "views/admin/listTemp.hbs", {
        precompiled: true
    });
    req.listTemp = template;
	next();
}

const questTemp = async function (req, res, next) {
	const template = await hbs.getTemplate( "views/admin/quest.hbs", {
        precompiled: true
    });
    req.questTemp = template;
	next();
}







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
router.get('/', exposeTemplate, (req, res, next) => {
  res.render('admin/indexAdmin', {
  });
})

router.get('/list',listTemp, async function (req, res, next) {
  const users = await User.find()
  //console.log(users)
  res.render('admin/list', {user: users, listTemp: req.listTemp});
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

router.get('/test', quas, createShield ,tests, findTests,questTemp, function (req, res, next) {
  res.render('admin/test', {
    tests : req.tests,
    testsTemplate: req.testsTemplate,
    createShieldTemplate: req.createShieldTemplate,
    quastionTemplate: req.quastionTemplate,
    questTemplate: req.questTemp
  });
})

router.get('/stats', async function (req, res, next) {
  let nani = await Stat.find()
  res.render('admin/stats', {nani : nani});
})
// ----------------------------------------

router.post('/createCardbox', async function (req, res, next) {
  await new CardBox({
    title: req.body.title,
    position: req.body.position
  }).save()
  let cardbox = await CardBox.find();
  res.json(cardbox)
})

router.delete('/:id', async function (req, res, next) {
  const del = await CardBox.findById(req.params.id);
  await Card.deleteMany({ cardBox: del.title });
  await CardBox.findByIdAndRemove(req.params.id);
  // const del2 = await Card.findOneAndRemove({ category: del.title });

  res.json({
    deleted: true
  }); 
});

router.post('/createCard', async function (req, res, next) {
  await new Card({
    title: req.body.title,
    content: req.body.content,
    cardBox: req.body.cardBox
  }).save()
  let cards = await Card.find();
  res.json(cards)
})

router.get('/content/:category', exposeTemplate, async function (req, res, next) {
  let cards = await Card.find({cardBox : req.params.category });
  res.render('admin/inCategory', { 
    cards,
    template3: res.newcardTemplate
   });
})




const findOrCreate = async function(req, res, next){
  let  test = await QuastionBox.findOne({title: req.body.input})
  if(test){
    req.test = test
    next()
  } 
  else{
    newTest = new QuastionBox({title : req.body.input, position: req.body.input2})
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

router.post("/list", async function (req, res, next){
  await User.findOneAndUpdate({name: req.body.nameA}, {$set: {name: req.body.name, position: req.body.pos, telephone: req.body.tel}})
  const users = await User.find()
  console.log(req.body)
  res.json({
    user:users
  })
})

router.post("/question", create, function(req, res){
  res.end()
  
} )

router.post("/test", async function(req,res){
  await QuastionBox.findOneAndRemove({title: req.body.linkDel})
   await Quastion.findOneAndRemove({quastionBox: req.body.linkDel})
  const findQ = await Quastion.find({quastionBox: req.body.link})
  const findAll = await QuastionBox.find()
  res.json({
    quest: findQ,
    tests: findAll
  })
})
module.exports = router;
