const express = require('express');
const router = express.Router();
const User = require("../modules/users")
const handlebars = require('express-handlebars');
const path = require('path');



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

router.get('/', (req, res, next) => {
  res.render('admin/indexAdmin');
})

router.get('/list',listTemp, async function (req, res, next) {
  const users = await User.find()
  //console.log(users)
  res.render('admin/list', {user: users, listTemp: req.listTemp});
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

router.post("/list", async function (req, res, next){
  await User.findOneAndUpdate({name: req.body.nameA}, {$set: {name: req.body.name, position: req.body.pos, telephone: req.body.tel}})
  const users = await User.find()
  console.log(req.body)
  res.json({
    user:users
  })
})

module.exports = router;
