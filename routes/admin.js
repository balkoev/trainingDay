const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('admin/indexAdmin');
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

module.exports = router;
