var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page. */
router.get('/suadaunanh/:sdt', function(req, res, next) {
   res.cookie('dt',req.params.sdt,{maxAge:900000});
   res.send("Số đt là : " +req.params.sdt);
 
});
/* GET home page. */
router.get('/banhra', function(req, res, next) {
  res.send("Số đt là : " + req.cookies.dt);
});

/* GET home page. */
router.get('/xoa', function(req, res, next) {
  res.clearCookie('dt');
  res.send("Da xoa roi ");
});

/* GET home page. */
router.get('/taosession', function(req, res, next) {
  req.session.monan = "Bun rieu cua";
  res.send("Da tao roi  ");
});
/* GET home page. */
router.get('/laysession', function(req, res, next) {
   
  res.send("Session la  " + req.session.monan);
});
/* GET home page. */
router.get('/huysession', function(req, res, next) {
  req.session.destroy(function(err){
    console.log(err);
  });
  res.send("Session da huy  " );
  res.end();
});


 

module.exports = router;
