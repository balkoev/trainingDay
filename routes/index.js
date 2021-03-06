const express = require('express');
const router = express.Router();
const SmsSender = require('../auth');
const User = require("../modules/users");

router.get('/', (req, res, next) => {
  res.redirect('/auth');
})

router.get('/auth', async (req, res, next) => {
  let user = await User.findOne({tel: req.session.mobile})
  console.log(user)
  if (req.session.verify && user.position != "Admin" && user.position) {
    res.redirect('/user')
  } else if(req.session.verify && user.position == "Admin"){
    res.redirect('/admin')
  }
  else
   {
  res.render('index', { verify: req.session.verify});
  }
})


router.post('/auth/send-sms', (req, res, next) => {
  let genCode = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  req.session.smsCode = genCode;
  req.session.mobile = req.body.mobile
  req.session.verify = false;
  console.log(req.session.smsCode)
  SmsSender(genCode, req.body.mobile)
  res.end();
});

router.post('/auth/confirm-sms', (req, res, next) => {
  console.log(req.session.smsCode)
  if (req.body.smsCode === req.session.smsCode) {
    req.session.verify = true;
    console.log('Sms code accept')
    res.json({
      smsCode: true
    });
  } else {
    console.log('Wrong sms code');
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/')
})

module.exports = router;
