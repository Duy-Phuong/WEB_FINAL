var express = require('express');
var router = express.Router();


/* Trang fashion mot . */
router.get('/mot-14.chn', function(req, res, next) {
    res.send('Day la trang Fashion > Mot ')
  });
  
  /* Trang fashion mot . */
  router.get('/lam-dep.chn', function(req, res, next) {
    res.send('Day la trang Fashion > Làm đẹp  ')
  });
  
  /* Trang fashion mot . */
  router.get('/star-style.chn', function(req, res, next) {
    res.send('Day la trang Fashion > Start style  ')
  });
  
  /* Trang fashion mot . */
  router.get('/fashion-icon.chn', function(req, res, next) {
    res.send('Day la trang Fashion >  /fashion-icon.chn  ')
  });
  

  module.exports = router ; 