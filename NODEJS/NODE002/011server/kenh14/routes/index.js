var express = require('express');
var router = express.Router();
var dungthu = require('../test/module1'); //bat dau bang./


/* GET home page. */
router.get('/', function(req, res, next) {
  dungthu.c("Phuong");

console.log('tuoi ' + dungthu.t);
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/tin-tuc', function(req, res, next) {
  res.render('tin', { title: 'Tin tức' });
});

/* GET home page. */
router.get('/san-pham', function(req, res, next) {
  res.render('san-pham', { title: 'Trang Sản phẩm', noidung:"day la noi dung" });
});

/* GET home page. */
router.get('/fedu', function(req, res, next) {
  var dulieu = { danhsachsv : ["viet","nga","my","an do"]};

  res.render('fedu', { danhsach: dulieu });
});


/* Trang about. */
router.get('/about.html', function(req, res, next) {
  res.render('about', { title: 'Trang about' });
});



/* Trang chi tiet. */
router.get('/post.html', function(req, res, next) {
  res.render('post', { title: 'Trang Post' });
});




/* Trang chi tiet. */
router.get('/sp/:chisosanpham/:gia', function(req, res, next) {
  res.send(' mã sản phẩm là ' + req.params.chisosanpham + " Giá sản phẩm là : " + req.params.gia );
});




/* Trang chi tiet. */
router.get('/fedu?vn', function(req, res, next) {
  res.send(' test' );
});

 

/* Trang chi tiet. */
router.get('/fe(du)?vn', function(req, res, next) {
  res.send(' test' );
});

 
 

/* Trang chi tiet. */
router.get('/zing*vn', function(req, res, next) {
  res.send('Zing vn' );
});
/* Trang chi tiet. */
router.get('/*.:mabaiviet', function(req, res, next) {
  res.send('Link kieu tinh te vn ' + req.params.mabaiviet);
});

 





module.exports = router;
