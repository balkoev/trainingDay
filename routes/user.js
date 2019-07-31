const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
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
