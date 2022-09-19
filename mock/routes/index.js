/*
 * @Author: atdow
 * @Date: 2022-09-17 22:44:39
 * @LastEditors: null
 * @LastEditTime: 2022-09-18 00:41:20
 * @Description: file description
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/my-api', function (req, res) {
  res.send({message:'request success'})
})

module.exports = router;
