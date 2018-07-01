var express = require('express');
var router = express.Router();

var mysql = require('mysql');
//CSDL
var productcateRepo = require('../repos/productcateRepo'); //loai sp
var nsxRepo = require('../repos/nsxRepo'); //nsx
var categoryRepo = require('../repos/categoryRepo');
var productRepo = require('../repos/productRepo');
var billRepo = require('../repos/billRepo');


/* GET home page. */
router.get('/index.html', function(req, res, next) {
  var watch;
  var sale;
 
  
    //
  var cate;
  var nsx;
    productcateRepo.loadAll().then(rows3 => {
    console.log(rows3);
    cate = { danhsachsv3 : rows3};
      
    nsxRepo.loadAll().then(rows4 => {
      console.log(rows4);
      nsx = { danhsachsv4 : rows4};

      productRepo.loadAllTopWatch().then(rows2 => {
        console.log(rows2);
        watch = { danhsachsv1 : rows2};
          
        productRepo.loadAllTopSale().then(rows1 => {
          console.log(rows1);
          sale = { danhsachsv2 : rows1};
    
          productRepo.loadAllTopDate().then(rows => {
            console.log(rows);
            var dulieu = { danhsachsv : rows};
            res.render('index', { danhsach: dulieu, danhsach1: watch, danhsach2: sale, danhsach3: cate, danhsach4: nsx });
        });
    
        });
    
         
        });

    });
    });
  //res.render('index', { title: 'Final Project - Laptop Store Website - N4QPT' });
});
/* GET dashboard page. */


router.get('/index1.html', function(req, res, next) {
  // categoryRepo.loadAll().then(rows => {
  //   // console.log(rows);
  //   var vm = {
  //       categories: rows
  //   };
  // });
  res.render('index1', { title: 'dashboard' });
});
/* GET product page. */
router.get('/products.html', function(req, res, next) {
  res.render('products', { title: 'product' });
});
/* ban chay */
router.get('/products.html/topsale', function(req, res, next) {
  var watch;
  var sale;
 
  
    //
  var cate;
  var nsx;
    productcateRepo.loadAll().then(rows3 => {
    console.log(rows3);
    cate = { danhsachsv3 : rows3};
      
    nsxRepo.loadAll().then(rows4 => {
      console.log(rows4);
      nsx = { danhsachsv4 : rows4};

      productRepo.loadAllTopWatch().then(rows2 => {
        console.log(rows2);
        watch = { danhsachsv1 : rows2};
          
        productRepo.loadAllTopSale().then(rows1 => {
          console.log(rows1);
          sale = { danhsachsv : rows1};
    
          productRepo.loadAllTopDate().then(rows => {
            console.log(rows);
            var dulieu = { danhsachsv2 : rows};
            res.render('products2', { danhsach: sale, danhsach1: watch, danhsach2: dulieu, danhsach3: cate, danhsach4: nsx });
        });
    
        });
    
         
        });

    });
    });  
  //res.render('products', { title: 'product' });
});
/* moi nhat chay */
router.get('/products.html/new', function(req, res, next) {
  var watch;
  var sale;
 
  
    //
  var cate;
  var nsx;
    productcateRepo.loadAll().then(rows3 => {
    console.log(rows3);
    cate = { danhsachsv3 : rows3};
      
    nsxRepo.loadAll().then(rows4 => {
      console.log(rows4);
      nsx = { danhsachsv4 : rows4};

      productRepo.loadAllTopWatch().then(rows2 => {
        console.log(rows2);
        watch = { danhsachsv1 : rows2};
          
        productRepo.loadAllTopSale().then(rows1 => {
          console.log(rows1);
          sale = { danhsachsv2 : rows1};
    
          productRepo.loadAllTopDate().then(rows => {
            console.log(rows);
            var dulieu = { danhsachsv : rows};
            res.render('products2', { danhsach: dulieu, danhsach1: watch, danhsach2: sale, danhsach3: cate, danhsach4: nsx });
        });
    
        });
    
         
        });

    });
    });  
});
//lay theo nsx
router.get('/products.nsx/:id', function(req, res, next) {
  var id = req.params.id;
  var cate;
  var nsx;
  var limit = 100;
    productcateRepo.loadAll().then(rows1 => {
   // console.log(rows);
    cate = { danhsachsv3 : rows1};
    nsxRepo.loadAll().then(rows2 => {
     // console.log(rows);
      nsx = { danhsachsv4 : rows2};
      productRepo.loadAllnsx(id, limit).then(rows3 => {
        var dulieu = { danhsachsv : rows3};
           
             
                res.render('products2', { danhsach: dulieu, danhsach3: cate, danhsach4: nsx });

        });
    });
    });
});

//lay theo loaisp 
router.get('/products.cate/:id', function(req, res, next) {
  var id = req.params.id;
  var cate;
  var nsx;
  var limit = 100;
    productcateRepo.loadAll().then(rows1 => {
   // console.log(rows);
    cate = { danhsachsv3 : rows1};
    nsxRepo.loadAll().then(rows2 => {
     // console.log(rows);
      nsx = { danhsachsv4 : rows2};
      productRepo.loadAllcate(id, limit).then(rows3 => {
        var dulieu = { danhsachsv : rows3};
           
             
                res.render('products2', { danhsach: dulieu, danhsach3: cate, danhsach4: nsx });

        });
    });
    });
});
/* GET product_detail page. */
router.get('/product_detail.html', function(req, res, next) {
 res.render('product_detail', { title: 'product_detail' });
});
router.get('/product_detail.html/:id', function(req, res, next) {
    var id = req.params.id;
    var cate;
    var nsx;
    var ds1;
    var ds2;
    var sale;
    var limit = 6;
      productcateRepo.loadAll().then(rows1 => {
     // console.log(rows);
      cate = { danhsachsv1 : rows1};
      nsxRepo.loadAll().then(rows2 => {
       // console.log(rows);
        nsx = { danhsachsv2 : rows2};
        productRepo.single(id).then(c => {
         // console.log(c);
         console.log("====nsx : " + c.nsxID + " ==== loai: " + c.CatID);
           productRepo.loadAllnsx(c.nsxID, limit).then(rows3 => {
            ds1 = { danhsachsv3 : rows3};
                productRepo.loadAllcate(c.CatID, limit).then(rows4 => {
                  ds2 = { danhsachsv4 : rows4};
                  productRepo.loadAllTopSale().then(rows5 => {
                    //console.log(rows5);
                    sale = { danhsachsv5 : rows5};
              
                    res.render('product_detail', { danhsach: c, danhsach1: cate, danhsach2: nsx, danhsach3: ds1, danhsach4: ds2, danhsach5: sale });

              
                  });
                });
            });
        
        });
      });
      });
  //res.render('product_detail', { title: 'product_detail' });
});
/* GET cart.html page. */
router.get('/cart.html', function(req, res, next) {
  res.render('cart', { title: 'cart' });
});
/* GET checkout.html page. */
router.get('/checkout.html', function(req, res, next) {
  res.render('checkout', { title: 'checkout' });
});

/* GET register.html page. */
router.get('/register.html', function(req, res, next) {
  res.render('register', { title: 'register' });
});
/* GET donhang page. */
router.get('/donhang.html', function(req, res, next) {
  billRepo.loadAll().then(rows => {
    console.log(rows);
   var dulieu = { danhsachsv : rows};
   res.render('donhang', { danhsach: dulieu });
 });
 
  //res.render('donhang', { title: 'donhang' });
});

router.post('/donhang.html', function(req, res, next) {
  var diaChi = req.body.diaChi;
  var ten = req.body.ten;
  var sdt = req.body.sdt;
  var ngayNhap = req.body.ngayNhap;
  var status = req.body.status;
  billRepo.add(ten, diaChi, sdt, ngayNhap, status).then(value => {
    res.redirect('/donhang.html');

  }).catch(err => {
      res.end('fail');
  });
 
});
//xoa don hang

router.get('/xoadonhang/:idxoa', function(req, res, next) {
  var id = req.params.idxoa;
  console.log("id can xoa la: " + id);


  billRepo.delete(id).then(value => {
    res.redirect('/donhang.html');

  }).catch(err => {
      res.end('fail');
  });
});
//sua don hang
router.get('/suadonhang/:idsua', function(req, res, next) {
  var id = req.params.idsua;
  var cate;
  var nsx;
    billRepo.single(id).then(c => {
      console.log(c);
    res.render('suadonhang', { danhsach: c});
    });
});

router.post('/suadonhang/:idsua', function(req, res, next) {
  var id = req.params.idsua;
  var diaChi = req.body.diaChi;
  var ten = req.body.ten;
  var sdt = req.body.sdt;
  var ngayNhap = req.body.ngayNhap;
  var status = req.body.status;
// console.log(date.toString());

// console.log("==========" + req.body.ngayNhap);
// var str = req.body.ngayNhap;
// var temp = str.slice(4, 15);
// console.log("==========" + temp);
// var date = new Date(temp);
// console.log("==========" + date);
// console.log(req.body.ngayNhap);
//     var month = date.getMonth()+1;
//     var thang="";
//     if(month <  10){
//         thang = "0" + month.toString();
//     }else{
//       thang = month;
//     }
//     var ngayNhap = date.getFullYear().toString() +"-" + thang +"-"+date.getDate().toString(); 
    console.log("ngayNhap: " + ngayNhap);

  billRepo.update(ten, diaChi, sdt, ngayNhap, status, id).then(value => {
    res.redirect('/donhang.html');

  }).catch(err => {
      res.end('fail');
  });
});
//end sua don hang

/* GET sanpham page. */
router.get('/sanpham.html', function(req, res, next) {
 
  var cate;
  var nsx;
    productcateRepo.loadAll().then(rows3 => {
    console.log(rows3);
    cate = { danhsachsv1 : rows3};
      
    nsxRepo.loadAll().then(rows2 => {
      console.log(rows2);
      nsx = { danhsachsv2 : rows2};

      productRepo.loadAll().then(rows => {
        console.log(rows);
        var dulieu = { danhsachsv : rows};
        res.render('sanpham', { danhsach: dulieu, danhsach1: cate, danhsach2: nsx });
    });

    });

     
    });
    
  


 // res.render('sanpham', { title: 'sanpham' });
});
/* POST sanpham page. */
router.post('/sanpham.html', function(req, res, next) {
    var mota = req.body.comment;
    var ten = req.body.ten;
    var CatID = req.body.loai;
    var nsxID = req.body.nsx;
    var gia = req.body.gia;
    var ngayNhap = "";
    var date = new Date();
    //ngayNhap = date.toString();
    var month = date.getMonth()+1;
    var thang="";
    if(month <  10){
        thang = "0" + month.toString();
    }else{
      thang = month;
    }
    ngayNhap = date.getFullYear().toString() +"-" + thang +"-"+date.getDate().toString(); 
    var xuatxu = req.body.xuatxu;
    console.log("ten: " + ten + " ;CatID: " + CatID + " ;nsxID: " + nsxID + " ;gia: " + gia + " ;ngayNhap: " + ngayNhap + " ;xuatxu: " + xuatxu);
    productRepo.add(ten, mota, CatID, nsxID, gia, xuatxu, ngayNhap).then(value => {
      res.redirect('/sanpham.html');

    }).catch(err => {
        res.end('fail');
    });
});
//sua sp
router.get('/suasp/:idsua', function(req, res, next) {
  var id = req.params.idsua;
  var cate;
  var nsx;
    productcateRepo.loadAll().then(rows => {
    console.log(rows);
    cate = { danhsachsv1 : rows};
    nsxRepo.loadAll().then(rows => {
      console.log(rows);
      nsx = { danhsachsv2 : rows};
      productRepo.single(id).then(c => {
        console.log(c);
      res.render('sua3', { danhsach: c, danhsach1: cate, danhsach2: nsx });
      });
    });
    });
    
    
});

router.post('/suasp/:idsua', function(req, res, next) {
  var id = req.params.idsua;
  var mota = req.body.comment;
    var ten = req.body.ten;
    var CatID = req.body.loai;
    var nsxID = req.body.nsx;
    var gia = req.body.gia;
// console.log(date.toString());

console.log("==========" + req.body.ngayNhap);
var str = req.body.ngayNhap;
var temp = str.slice(4, 15);
console.log("==========" + temp);
var date = new Date(temp);
console.log("==========" + date);
console.log(req.body.ngayNhap);
    var month = date.getMonth()+1;
    var thang="";
    if(month <  10){
        thang = "0" + month.toString();
    }else{
      thang = month;
    }
    var ngayNhap = date.getFullYear().toString() +"-" + thang +"-"+date.getDate().toString(); 
    console.log("ngayNhap: " + ngayNhap);
    var NumSale = req.body.NumSale;
    var NumWatch = req.body.NumWatch;
    var xuatxu = req.body.xuatxu;
  console.log("id can sua la: " + id);
  console.log("ten: " + ten + " ;CatID: " + CatID + " ;nsxID: " + nsxID + " ;gia: " + gia + " ;ngayNhap: " + ngayNhap + " ;xuatxu: " + xuatxu);

  productRepo.update(ten, mota, CatID, nsxID, gia, xuatxu, ngayNhap, NumSale, NumWatch, id).then(value => {
    res.redirect('/sanpham.html');

  }).catch(err => {
      res.end('fail');
  });
});
//xoa sp

router.get('/xoasp/:idxoa', function(req, res, next) {
  var id = req.params.idxoa;
  console.log("id can xoa la: " + id);

  productRepo.delete(id).then(value => {
    res.redirect('/sanpham.html');

  }).catch(err => {
      res.end('fail');
  });
 
});

/* GET sanpham1.html page. */
var dulieu1;

router.get('/sanpham1.html', function(req, res, next) {
//   var connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '1234',
//     database: 'qlbh'
// });

// connection.connect();

// connection.query("SELECT * FROM `productcate`", function (error, rows) {
//   if (error) throw error;
//   console.log('The solution is: ', rows);
//    var cate = {value: rows};
//   for (c of cate.value) {
//     console.log(`#${c.CatID} || ${c.CatName}`);
//    }

//     var dulieu = { danhsachsv : rows};
//    dulieu1 = { danhsachsv : rows};
//   //var dulieu = { danhsachsv : ["viet","nga","my","an do"]};

//   res.render('sanpham1', { danhsach: dulieu });

//   connection.end();
//   });

productcateRepo.loadAll().then(rows => {
   console.log(rows);
  var dulieu = { danhsachsv : rows};
  res.render('sanpham1', { danhsach: dulieu });
});
  //res.render('sanpham1', { title: 'loai san pham' });
});
/* GET sanpham2.html page. */
router.get('/sanpham2.html', function(req, res, next) {
//   var connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '1234',
//     database: 'qlbh'
// });

// connection.connect();

// connection.query("SELECT * FROM `nsx`", function (error, rows) {
//   if (error) throw error;
//   console.log('The solution is: ', rows);
//    var cate = {value: rows};
//   for (c of cate.value) {
//     console.log(`#${c.nsxID} || ${c.nsxName}`);
//    }
//     var dulieu = { danhsachsv : rows};

//   res.render('sanpham2', { danhsach: dulieu });

//   connection.end();
//   });

nsxRepo.loadAll().then(rows => {
  console.log(rows);
 var dulieu = { danhsachsv : rows};
 res.render('sanpham2', { danhsach: dulieu });
});
  //res.render('sanpham2', { title: 'nha san xuat' });
});
/* GET checkout.html page. */
router.get('/calendar.html', function(req, res, next) {
  res.render('calendar', { title: 'lich' });
});

/* GET checkout.html page. */

router.get('/test.html', function(req, res, next) {
  

    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '1234',
        database: 'qlbh'
    });

    connection.connect();
    
    connection.query("SELECT * FROM `categories`", function (error, rows) {
      if (error) throw error;
      console.log('The solution is: ', rows);
       var cate = {value: rows};
      for (c of cate.value) {
        console.log(`#${c.CatID} || ${c.CatName}`);
       }
        var dulieu = { danhsachsv : rows};

    //var dulieu = { danhsachsv : ["viet","nga","my","an do"]};

    res.render('test', { danhsach: dulieu });

  connection.end();
});
});

/* GET checkout.html page. */

router.post('/them.html', function(req, res, next) {
  
      var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '1234',
        database: 'qlbh'
    });

    connection.connect();
    var ten = req.body.ten;
    var dt = req.body.dt;
    if( ten != null){
    var sql = "INSERT INTO `categories` (`CatID`, `CatName`) VALUES (NULL, '"+ ten +"')";
    connection.query(sql, function (error, rows) {
      if (error) throw error;
      console.log('The solution is: ', ten);


    connection.end();
    
    });
  }
  res.render('them', {data: 'text'});
});


router.get('/them.html', function(req, res, next) {
  res.render('them', { title: 'Final Project - Laptop Store Website - N4QPT' });
});

router.get('/xoa/:idxoa', function(req, res, next) {
  var id = req.params.idxoa;
  console.log("id can xoa la: " + id);

  var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'qlbh'
});

connection.connect();

var sql = "DELETE FROM `categories` WHERE `categories`.`CatID` = "+ id +"";
connection.query(sql, function (error, rows) {
  if (error) throw error;
  console.log('The solution is: ', sql);


connection.end();

});


  res.redirect('/test.html');
});


router.get('/sua/:idsua', function(req, res, next) {
  var id = req.params.idsua;
  console.log("id can sua la: " + id);

  var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'qlbh'
});

connection.connect();
var name = 'Loại 7';
var sql = "UPDATE `categories` SET `CatName` = '" + name + "' WHERE `categories`.`CatID` = "+ id +"";
connection.query(sql, function (error, rows) {
  if (error) throw error;
  console.log('The solution is: ', sql);


connection.end();

});


  res.redirect('/test.html');
});

// ================ xứ lí thêm loại sản phẩm ==================================
router.post('/sanpham1.html', function(req, res, next) {
  // var connection = mysql.createConnection({
  //   host: 'localhost',
  //   port: 3306,
  //   user: 'root',
  //   password: '1234',
  //   database: 'qlbh'
  // });

  // connection.connect();
  // var ma = req.body.ma;
  // var ten = req.body.ten;
  // if( ten != null){
  // var sql = "INSERT INTO `productcate` (`CatID`, `CatName`) VALUES (NULL, '"+ ten +"')";
  // connection.query(sql, function (error, rows) {
  //   if (error) throw error;
  //   console.log('The solution is: ', ten);

  //   //load update
    

  //   connection.end();
  // });
  // }
  
  ////res.render('sanpham1', { danhsach: dulieu1 });

  var ma = req.body.ma;
  var ten = req.body.ten;
  productcateRepo.add(req.body.ten).then(value => {
    res.redirect('/sanpham1.html');

  }).catch(err => {
      res.end('fail');
  });

});

//xoa

router.get('/xoaloaisp/:idxoa', function(req, res, next) {
  var id = req.params.idxoa;
  console.log("id can xoa la: " + id);

//   var connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '1234',
//     database: 'qlbh'
// });


// connection.connect();

// var sql = "DELETE FROM `productcate` WHERE `productcate`.`CatID` = "+ id +"";
// connection.query(sql, function (error, rows) {
//   if (error) throw error;
//   console.log('The solution is: ', sql);


// connection.end();

// });

  productcateRepo.delete(id).then(value => {
    res.redirect('/sanpham1.html');

  }).catch(err => {
      res.end('fail');
  });
 
});

router.get('/xoansx/:idxoa', function(req, res, next) {
  var id = req.params.idxoa;
  console.log("id can xoa la: " + id);

//   var connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '1234',
//     database: 'qlbh'
// });


// connection.connect();

// var sql = "DELETE FROM `nsx` WHERE `nsx`.`nsxID` = "+ id +"";
// connection.query(sql, function (error, rows) {
//   if (error) throw error;
//   console.log('The solution is: ', sql);


// connection.end();

// });

  nsxRepo.delete(id).then(value => {
    res.redirect('/sanpham2.html');

  }).catch(err => {
      res.end('fail');
  });
});
//xứ lí thêm nsx
router.post('/sanpham2.html', function(req, res, next) {
//   var connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '1234',
//     database: 'qlbh'
//   });

//   connection.connect();
//   var ma = req.body.ma;
//   var ten = req.body.ten;
//   if( ten != null){
//   var sql = "INSERT INTO `nsx` (`nsxID`, `nsxName`) VALUES (NULL, '"+ ten +"')";
//   connection.query(sql, function (error, rows) {
//     if (error) throw error;
//     console.log('The solution is: ', ten);

//     //load update
    

//     connection.end();
    
//   });
//   }
// res.redirect('/sanpham2.html');
    var ma = req.body.ma;
    var ten = req.body.ten;
    nsxRepo.add(req.body.ten).then(value => {
      res.redirect('/sanpham2.html');

    }).catch(err => {
        res.end('fail');
    });
});
//sua loai sp
router.get('/sualoaisp/:idsua', function(req, res, next) {
  var id = req.params.idsua;
//   var connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '1234',
//     database: 'qlbh'
// });

// connection.connect();
// var sql = "SELECT * FROM `productcate` WHERE `productcate`.`CatID` = "+ id +"";
// connection.query(sql, function (error, rows) {
//   if (error) throw error;
//   console.log('The solution is: ', rows);
//    var cate = {value: rows};
//   for (c of cate.value) {
//     console.log(`#${c.CatID} || ${c.CatName}`);
//    }
//     var dulieu = { danhsachsv : rows};
//    dulieu1 = { danhsachsv : rows};
//   //var dulieu = { danhsachsv : ["viet","nga","my","an do"]};

//   res.render('sua', { danhsach: dulieu });

//   connection.end();
//   });
//   //res.render('sua', { title: 'sua' });

    productcateRepo.single(id).then(c => {
      console.log(c);
    res.render('sua', { danhsach: c });
    });
});

router.post('/sualoaisp/:idsua', function(req, res, next) {
  var id = req.params.idsua;
  var name = req.body.ten;
  console.log("id can sua la: " + id);

  // var connection = mysql.createConnection({
  //   host: 'localhost',
  //   port: 3306,
  //   user: 'root',
  //   password: '1234',
  //   database: 'qlbh'
  // });

  // connection.connect();
  // var name = req.body.ten;
  // var sql = "UPDATE `productcate` SET `CatName` = '" + name + "' WHERE `productcate`.`CatID` = "+ id +"";
  // connection.query(sql, function (error, rows) {
  // if (error) throw error;
  // console.log('The solution is: ', sql);


  // connection.end();

  // });


  // res.redirect('/sanpham1.html');
  productcateRepo.update(name, id).then(value => {
    res.redirect('/sanpham1.html');

  }).catch(err => {
      res.end('fail');
  });
});

//sua nsx
router.get('/suansx/:idsua', function(req, res, next) {
  var id = req.params.idsua;
//   var connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '1234',
//     database: 'qlbh'
// });

// connection.connect();
// var sql = "SELECT * FROM `nsx` WHERE `nsx`.`nsxID` = "+ id +"";
// connection.query(sql, function (error, rows) {
//   if (error) throw error;
//   console.log('The solution is: ', rows);
//    var cate = {value: rows};
  
//     var dulieu = { danhsachsv : rows};
//    dulieu1 = { danhsachsv : rows};
//   //var dulieu = { danhsachsv : ["viet","nga","my","an do"]};

//   res.render('sua2', { danhsach: dulieu });

//   connection.end();
//   });
//   //res.render('sua', { title: 'sua' });
    nsxRepo.single(id).then(c => {
      console.log(c);
    res.render('sua2', { danhsach: c });
    });
});

router.post('/suansx/:idsua', function(req, res, next) {
  var id = req.params.idsua;
  var name = req.body.ten;
  console.log("id can sua la: " + id);

  // var connection = mysql.createConnection({
  //   host: 'localhost',
  //   port: 3306,
  //   user: 'root',
  //   password: '1234',
  //   database: 'qlbh'
  // });

  // connection.connect();
  // var name = req.body.ten;
  // var sql = "UPDATE `nsx` SET `nsxName` = '" + name + "' WHERE `nsx`.`nsxID` = "+ id +"";
  // connection.query(sql, function (error, rows) {
  // if (error) throw error;
  // console.log('The solution is: ', sql);


  // connection.end();

  // });


  // res.redirect('/sanpham2.html');

  nsxRepo.update(name, id).then(value => {
    res.redirect('/sanpham2.html');

  }).catch(err => {
      res.end('fail');
  });
});
module.exports = router;
