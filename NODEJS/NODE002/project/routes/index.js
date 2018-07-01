var express = require('express');
//format date
var moment = require('moment');
var router = express.Router();
//phan trang
var config = require('../config/config');

//
var mysql = require('mysql');
//CSDL
var productcateRepo = require('../repos/productcateRepo'); //loai sp
var nsxRepo = require('../repos/nsxRepo'); //nsx
var categoryRepo = require('../repos/categoryRepo');
var productRepo = require('../repos/productRepo');
var billRepo = require('../repos/billRepo');
var billInfoRepo = require('../repos/billInfoRepo');

var customerRepo = require('../repos/customerRepo');
//acc
var accountRepo = require('../repos/accountRepo');
var SHA256 = require('crypto-js/sha256');
//cart
var cartRepo = require('../repos/cartRepo');


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
            res.render('products2', { danhsach: sale, danhsach1: watch, danhsach2: dulieu, danhsach3: cate, danhsach4: nsx, page: null });
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
            res.render('products2', { danhsach: dulieu, danhsach1: watch, danhsach2: sale, danhsach3: cate, danhsach4: nsx, page: null });
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
  var offset = 0;
    //-------------------------------
    var page = req.query.page;
    if (!page) {
        page = 1;
    }
      console.log("-------------------page -------------------------------" + page);
    offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p1 = productRepo.loadAllnsx(id, limit, offset);
    var p2 = productRepo.countByNsx(id);
    var vm;
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
      console.log("===========================pRows=============================");
         console.log(pRows);
         console.log("==========================countRows==============================");
         console.log(countRows);
         console.log("==========================nPages==============================");

        var total = countRows[0].total;
        var nPages = total / config.PRODUCTS_PER_PAGE;
        console.log(nPages);
        if (total % config.PRODUCTS_PER_PAGE > 0) {
            nPages++;
        }

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }
        console.log("==========================numbers============================");
         console.log(numbers);
        vm = {
            products: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers,
            type: "products.nsx" //loai de tuy chon link page number
        };
        console.log("==========================vm==============================");
         console.log(vm);
       });
       
         
    

  //-------------------------------
    productcateRepo.loadAll().then(rows1 => {
   // console.log(rows);
    cate = { danhsachsv3 : rows1};
    nsxRepo.loadAll().then(rows2 => {
     // console.log(rows);
      nsx = { danhsachsv4 : rows2};
      productRepo.loadAllnsx(id, config.PRODUCTS_PER_PAGE, offset).then(rows3 => {
        var dulieu = { danhsachsv : rows3};
           
             
                res.render('products2', { danhsach: dulieu, danhsach3: cate, danhsach4: nsx, page: vm, IDCat: id });

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
  var offset = 0;
  //-------------------------------
  var page = req.query.page;
    if (!page) {
        page = 1;
    }
      console.log("-------------------page -------------------------------" + page);
    offset = (page - 1) * config.PRODUCTS_PER_PAGE;

    var p1 = productRepo.loadAllcate(id, limit, offset);
    var p2 = productRepo.countByCat(id);
    var vm;
    Promise.all([p1, p2]).then(([pRows, countRows]) => {
      console.log("===========================pRows=============================");
         console.log(pRows);
         console.log("==========================countRows==============================");
         console.log(countRows);
         console.log("==========================nPages==============================");

        var total = countRows[0].total;
        var nPages = total / config.PRODUCTS_PER_PAGE;
        console.log(nPages);
        if (total % config.PRODUCTS_PER_PAGE > 0) {
            nPages++;
        }

        var numbers = [];
        for (i = 1; i <= nPages; i++) {
            numbers.push({
                value: i,
                isCurPage: i === +page
            });
        }
        console.log("==========================numbers============================");
         console.log(numbers);
        vm = {
            products: pRows,
            noProducts: pRows.length === 0,
            page_numbers: numbers,
            type: "products.cate" //loai de tuy chon link page number
        };
        console.log("==========================vm==============================");
         console.log(vm);
       });
       
         
    

  //-------------------------------
    productcateRepo.loadAll().then(rows1 => {
   // console.log(rows);
    cate = { danhsachsv3 : rows1};
    nsxRepo.loadAll().then(rows2 => {
     // console.log(rows);
      nsx = { danhsachsv4 : rows2};
      productRepo.loadAllcate(id, config.PRODUCTS_PER_PAGE, offset).then(rows3 => {
        var dulieu = { danhsachsv : rows3};
           
             
                res.render('products2', { danhsach: dulieu, danhsach3: cate, danhsach4: nsx, page: vm, IDCat: id });

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
    var offset = 0;
      productcateRepo.loadAll().then(rows1 => {
     // console.log(rows);
      cate = { danhsachsv1 : rows1};
      nsxRepo.loadAll().then(rows2 => {
       // console.log(rows);
        nsx = { danhsachsv2 : rows2};
        productRepo.single(id).then(c => {
         // console.log(c);
         console.log("====nsx : " + c.nsxID + " ==== loai: " + c.CatID);
           productRepo.loadAllnsx(c.nsxID, limit, offset).then(rows3 => {
            ds1 = { danhsachsv3 : rows3};
                productRepo.loadAllcate(c.CatID, limit, offset).then(rows4 => {
                  ds2 = { danhsachsv4 : rows4};
                  productRepo.loadAllTopSale().then(rows5 => {
                    //console.log(rows5);
                    sale = { danhsachsv5 : rows5};
                    //tang sl xem 
                    var soLuong = c.NumWatch + 1;
                    console.log("soluong: " + soLuong + "====nsx : " + c.nsxID + " ==== loai: " + c.CatID +" = proname== " + c.ProName+" = prodec== " + c.ProDec+" = proprice== " + c.ProPrice+" = addr== " + c.ProAddr+" = datein== " + c.ProDateIn +" = númale== " +  c.NumSale+" = cpu== " + c.CPU+" = ram== " +  c.RAM+" = weight == " +  c.Weight+" = HardDisk== " +  c.HardDisk+" = id== " +  c.ProID);
                    //ngay
                    var str = c.ProDateIn;
										var temp = str.toString().slice(4, 15);
										var date = new Date(temp);
								console.log("===NumStock===" + c.NumStock);
											var month = date.getMonth()+1;
											var thang="";
											thang = month;
                      var ngayNhap = date.getFullYear().toString()+ "-"+ thang + "-" +date.getDate().toString(); 
                      console.log(ngayNhap);
                    productRepo.update(c.ProName, c.ProDec, c.CatID, c.nsxID, c.ProPrice, c.ProAddr, ngayNhap, c.NumSale, soLuong, c.CPU, c.RAM, c.Weight, c.HardDisk, c.NumStock, c.ProID).then(value => {

                         res.render('product_detail', { danhsach: c, danhsach1: cate, danhsach2: nsx, danhsach3: ds1, danhsach4: ds2, danhsach5: sale });
                      }).catch(err => {
                        res.end('fail');
                    });
              
                  });
                });
            });
        
        });
      });
      });
  //res.render('product_detail', { title: 'product_detail' });
});

/* GET checkout.html page. */
router.get('/checkout.html', function(req, res, next) {
  res.render('checkout', { title: 'checkout' });
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
  var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DD');
    console.log(" ** *** ngay nhap: " + dob);
    var ngayNhap = dob;
 // var ngayNhap = req.body.ngayNhap;
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
 // var ngayNhap = req.body.ngayNhap;
 var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DD');
var ngayNhap = dob;
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
    var cpu = req.body.cpu;
    var ram = req.body.ram;
    var weight = req.body.weight;
    var harddisk = req.body.harddisk;
    var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DD');
    console.log(" ** *** ngay nhap: " + dob);
    var ngayNhap = "";
    // var date = new Date();
    // //ngayNhap = date.toString();
    // var month = date.getMonth()+1;
    // var thang="";
    // if(month <  10){
    //     thang = "0" + month.toString();
    // }else{
    //   thang = month;
    // }
    // ngayNhap = date.getFullYear().toString() +"-" + thang +"-"+date.getDate().toString(); 
    var stock = req.body.NumStock;
    console.log("stock : ========= " + stock);
    ngayNhap = dob;
    var xuatxu = req.body.xuatxu;
    console.log("** *** ngay nhap2: " + ngayNhap);
    console.log("ten: " + ten + " ;CatID: " + CatID + " ;nsxID: " + nsxID + " ;gia: " + gia + " ;ngayNhap: " + ngayNhap + " ;xuatxu: " + xuatxu);
    productRepo.add(ten, mota, CatID, nsxID, gia, xuatxu, ngayNhap, cpu,ram, weight, harddisk, stock ).then(value => {
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
    var stock = req.body.NumStock;
    var cpu = req.body.cpu;
    var ram = req.body.ram;
    var weight = req.body.weight;
    var harddisk = req.body.harddisk;
// console.log(date.toString());

var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DD');
var ngayNhap = dob;
//console.log("==========" + req.body.ngayNhap);

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
     console.log("ngayNhap sua: " + ngayNhap);
    var NumSale = req.body.NumSale;
    var NumWatch = req.body.NumWatch;
    var xuatxu = req.body.xuatxu;
  console.log("id can sua la: " + id);
  console.log("ten: " + ten + " ;CatID: " + CatID + " ;nsxID: " + nsxID + " ;gia: " + gia + " ;ngayNhap: " + ngayNhap + " ;xuatxu: " + xuatxu);

  productRepo.update(ten, mota, CatID, nsxID, gia, xuatxu, ngayNhap, NumSale, NumWatch, cpu, ram, weight, harddisk,stock, id).then(value => {
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('index.html');
});

router.post('/login.html', function(req, res, next) {
  //console.log("VO ne");
  console.log(req.body.username);
  console.log(req.body.password);
  var user = {
      username: req.body.username,
      password: SHA256(req.body.password).toString()
      //password: req.body.password
  };
  console.log(user);
  console.log("=================req.session.isLogged===================");
  console.log(req.session.isLogged);
  console.log("=================req.session.isLogged===================");
 // console.log(LayoutVM.isLogged);
  accountRepo.login(user).then(rows => {
    if (rows.length > 0) {
        req.session.isLogged = true;
        req.session.user = rows[0];
        req.session.cart = [];

        console.log(" =================== req.session.user  ============================");
        console.log(req.session.user );

        var url = '/';
        if (req.query.retUrl) {
            url = req.query.retUrl;
        }
        res.redirect(url);

    } else {
        console.log("-------------------");
        var vm = {
            showError: true,
            errorMsg: 'Đăng nhập thất bại',
            type: 1
        };
        res.render('register', {ds: vm});
    }
});
});

/* GET register.html page. */
router.get('/register.html', function(req, res, next) {
  var vm = {
    showError: false,
    errorMsg: '',
    type: 0
  };
  res.render('register', {ds: vm});
  //res.render('register', { title: 'register' });
});

router.post('/register.html', (req, res) => {

  var dob = moment(req.body.dob, 'D/M/YYYY')
      .format('YYYY-MM-DDTHH:mm');

  var user = {
      username: req.body.username,
      password: SHA256(req.body.rawPWD).toString(),
      name: req.body.name,
      email: req.body.email,
      dob: dob,
      permission: 0,
      sdt: req.body.sdt
  };

  accountRepo.add(user).then(value => {
      var vm = {
        showError: true,
        errorMsg: 'Đăng kí thành công',
        type: 2
    };
    res.render('register', {ds: vm});
      
  });
});


/* GET checkout.html page. */
router.get('/logout.html', function(req, res, next) {
  req.session.isLogged = false;
  req.session.user = null;
  //req.session.cart = [];
  res.redirect(req.headers.referer);
});
/* GET checkout.html page. */
router.get('/logout1.html', function(req, res, next) {
  req.session.isLogged = false;
  req.session.user = null;
  // req.session.cart = [];
  res.redirect("/register.html");
});
/*----------Thong Tin Ca Nhan ---------------------*/
/* GET register.html page. */
router.get('/customer.html', function(req, res, next) {
  var vm = {
    showError: false,
    errorMsg: '',
    type: 0
  };
  res.render('customer', {ds: vm});
  //res.render('register', { title: 'register' });
});

router.post('/customer.html', function(req, res, next) {


var dob = moment(req.body.dob, 'D/M/YYYY')
      .format('YYYY-MM-DDTHH:mm');
      console.log("+================= DOB ===================");
      console.log(dob);
      console.log("+================= req.body.CusId ===================");
      console.log(req.body.CusId);
    //var id = req.params.idsua;
  var user = {
      username: req.body.username,
      password: SHA256(req.body.rawPWD).toString(),
      name: req.body.name,
      email: req.body.email,
      dob: dob,
      permission: 0,
      Id: req.body.CusId,
      sdt: req.body.sdt
  };
  
  customerRepo.update(user).then(value => {
      var vm = {
        showError: true,
        errorMsg: 'Cập nhật thành công',
        type: 2
    };
    accountRepo.login(user).then(rows => {
      if (rows.length > 0) {
          req.session.user = rows[0];
  
          console.log(" =================== req.session.user ***** ============================");
          console.log(req.session.user );
  
  
      }
  });
    res.render('customer', {ds: vm});
      
  });
});


router.post('/buy.html', function(req, res, next) {


  var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DDTHH:mm');
        console.log("+================= DOB ===================");
        console.log(dob);
        console.log("+================= req.body.CusId ===================");
        console.log(req.body.CusId);
      //var id = req.params.idsua;
    var user = {
        username: req.body.username,
        password: SHA256(req.body.rawPWD).toString(),
        name: req.body.name,
        email: req.body.email,
        dob: dob,
        permission: 0,
        Id: req.body.CusId,
        sdt: req.body.sdt
    };
    
    customerRepo.update(user).then(value => {
        var vm = {
          showError: true,
          errorMsg: 'Cập nhật thành công',
          type: 2
      };
      accountRepo.login(user).then(rows => {
        if (rows.length > 0) {
            req.session.user = rows[0];
    
            console.log(" =================== req.session.user ***** ============================");
            console.log(req.session.user );
    
    
        }
    });
      res.render('customer', {ds: vm});
        
    });
  });

  /* GET cart.html page. */
router.get('/cart', function(req, res, next) {
  
      //
  var cate;
    var nsx;
    var ds1;
    var ds2;
    var sale;
    var limit = 6;
    var offset = 0;
   
      productcateRepo.loadAll().then(rows1 => {
      cate = { danhsachsv1 : rows1};
      nsxRepo.loadAll().then(rows2 => {
        nsx = { danhsachsv2 : rows2};
                  productRepo.loadAllTopSale().then(rows5 => {
                    sale = { danhsachsv5 : rows5};
                    var arr_p = [];
                        console.log("======================req.session.cart===========================");
                        console.log(req.session.cart);
                        console.log("=================================================");
                        
                        for (var i = 0; i < req.session.cart.length; i++) {
                            var cartItem = req.session.cart[i];
                           // var p = productRepo.single(cartItem.ProId);
                           productRepo.single(cartItem.ProId).then(c => {
                            // console.log("========================= *** c ***  ==========================");

                            // var p = c;
                            // console.log(c);
                            arr_p.push(c);
                            // console.log("========================= *** c ***  ==========================");
                            //  console.log(c);
                             //console.log("========================= *** arr_p 11***  ==========================");
                            // console.log(arr_p);
                             console.log("=================================================");
                           });
                        }
                        console.log("========================= *** arr_p ***  ==========================");
                             console.log(arr_p);
                             console.log("=================================================");

                             var numbers = [];
                             for (i = 0; i < req.session.cart.length; i++) {
                             // var cartItem = req.session.cart[i];
                             // productRepo.single(cartItem.ProId).then(c => {
                              
                                numbers.push({
                                  value: i
                                  
                                 });
                            //   });
                                
                             }
                             console.log("==========================numbers============================");
                              console.log(numbers);
                        // var items = [];
                        // Promise.all(arr_p).then(result => {
                        //   console.log("==========================result============================");
                        //   console.log(result);
                        //     for (var i = arr_p.length - 1; i >= 0; i--) {
                        //         var pro = arr_p[i][0];
                        //         var item = {
                        //             Product: pro,
                        //             Quantity: req.session.cart[i].Quantity,
                        //             Amount: pro.ProPrice * req.session.cart[i].Quantity
                        //         };
                        //         console.log("========================= *** item 0000000 ***  ==========================");
                        //      console.log(item);
                        //         items.push(item);
                        //     }
                        productRepo.loadAll().then(rows => {
                             // console.log(rows);
                              var dulieu = { danhsachsv : rows};
                              var vm = {
                                items: req.session.cart
                            };
                             console.log("========================= *** items 11 ***  ==========================");
                             console.log(vm.items);
                            res.render('cart', { danhsach: dulieu, danhsach1: cate, danhsach2: nsx,  danhsach5: sale, ds: vm });

                          });
                           
                       //   });

            });
          });
      });
  //res.render('cart', { title: 'cart' });
});



router.post('/cart/add', (req, res) => {
  var item = {
      ProId: req.body.proId,
      Quantity: +req.body.quantity
  };

  cartRepo.add(req.session.cart, item);
  console.log("======================req.session.cart===========================");
  console.log(req.session.cart);
  console.log("=========================item  ==========================");
  console.log(item);
  res.redirect(req.headers.referer);
});

router.post('/cart/remove', (req, res) => {
  cartRepo.remove(req.session.cart, req.body.ProId);
  res.redirect(req.headers.referer);
});


router.post('/thanhtoan', function(req, res, next) {
  var diaChi = req.body.diaChi;
  var ten = req.body.ten;
  var sdt = req.body.sdt;
  var dob = moment(req.body.dob, 'D/M/YYYY')
        .format('YYYY-MM-DD');
    console.log(" ** *** ngay nhap: " + dob);
    var ngayNhap1 = dob;
 // var ngayNhap = req.body.ngayNhap;
 // var status = req.body.status;
 var status = "Chưa giao";
 var l = 0;
 //tang sl ban
 //req.session.sl = [];
  billRepo.add(ten, diaChi, sdt, ngayNhap1, status).then(value => {
                        console.log("======================req.session.cart===========================");
                        console.log(req.session.cart);
                        console.log("=================================================");
                        var sl = 0;
                        
                        for (var i = 0; i < req.session.cart.length; i++) {
                            var cartItem = req.session.cart[i];
                            sl = cartItem.Quantity;
                            console.log("so luong " + sl);
                            //req.session.sl.push(sl);
                            //cap nhat lai chi tiet hoa don
                            billInfoRepo.add(sdt, cartItem.ProId, cartItem.Quantity, ngayNhap1).then(value => {

                             
                            }).catch(err => {
                              res.end('fail');
                          });
                          
                        //  var p = [];
                          productRepo.single(cartItem.ProId).then(c => {
                            
                                      console.log("======================c===========================");
                                      console.log(c);
                                      var soLuong = c.NumSale + cartItem.Quantity;
                                      var kho = c.NumStock -  cartItem.Quantity;
                                      console.log("======================cartItem.Quantity===========================");
                                      console.log(cartItem.Quantity);
                                      productRepo.updatethanhtoan(soLuong, kho, c.ProId).then(value => {
                                 
                                               }).catch(err => {
                                                 res.end('fail');
                                             });
                          });  
              
                                      
                  //         productRepo.single(cartItem.ProId).then(c => {
                            
                  //           console.log("======================c===========================");
                  //           console.log(c);  
                  //           console.log("======================Quantity===========================");
                  //           console.log(cartItem.Quantity);
                  //          console.log("======================sdt ===========================");
                  //           console.log(sdt);
                  //           console.log("======================ngay ===========================");
                  //           console.log(dob);
                  //           console.log("======================id ===========================");
                  //           console.log(c.ProID);
                  //           // console.log("======================i===========================");
                  //           // console.log(i);
                  //           // console.log("======================req.ss===========================");
                  //           // console.log(req.session.sl[i]);
                           
                  //         //   billInfoRepo.single(sdt, dob, c.ProID).then(bill => {
                  //         //     console.log("======================bill ===========================");
                  //         //   // console.log(bill.num);
                  //         //   // billInfoRepo.single1(bill.id).then(o =>{
                  //         //   //   l = o.num;
                  //         //   // });
                  //         //     req.session.num = bill.num;
                            
                  //         // });
                  //         // 
                  //         // productRepo.single(cartItem.ProId).then(c1 => {
                  //         //   console.log("======================c1 ===========================");
                  //         //   console.log(c1);
                  //            // console.log("so luong b.num" + b.num);
                  //           var soLuong = c.NumSale + cartItem.Quantity;
                  //           var kho = c.NumStock -  cartItem.Quantity;
                  //            console.log(c.NumStock + " con lai kho ==========" + kho+" = proname== " + c.ProName);
                  //            console.log("soluong: " + soLuong + "====nsx : " + c.nsxID + " ==== loai: " + c.CatID +" = proname== " + c.ProName+" = prodec== " + c.ProDec+" = proprice== " + c.ProPrice+" = addr== " + c.ProAddr+" = datein== " + c.ProDateIn +" = númale== " +  c.NumSale+" = cpu== " + c.CPU+" = ram== " +  c.RAM+" = weight == " +  c.Weight+" = HardDisk== " +  c.HardDisk+" = id== " +  c.ProID);
                  //            //ngay
                  //            var str = c.ProDateIn;
                  //            var temp = str.toString().slice(4, 15);
                  //            var date = new Date(temp);
                  //          //	console.log("===ngay nhap sua3===" + date);
                  //              var month = date.getMonth()+1;
                  //              var thang="";
                  //              thang = month;
                  //              var ngayNhap = date.getFullYear().toString()+ "-"+ thang + "-" +date.getDate().toString(); 
                  //              console.log(ngayNhap);
                  //                productRepo.update(c.ProName, c.ProDec, c.CatID, c.nsxID, c.ProPrice, c.ProAddr, ngayNhap, soLuong, c.NumWatch, c.CPU, c.RAM, c.Weight, c.HardDisk, kho, c.ProID).then(value => {
                                 
                  //                    }).catch(err => {
                  //                      res.end('fail');
                  //                  });
                  //               //  });
                  //  //
                  //         }); 
                        }
      //update cart
      req.session.cart = [];   
      res.redirect('/cart');
  }).catch(err => {
      res.end('fail');
  });
 
});

/* GET history page. */
router.get('/history/:id', function(req, res, next) {
  var sdt = req.params.id;
  //
var cate;
var nsx;
var ds1;
var ds2;
var sale;
var limit = 6;
var offset = 0;

  productcateRepo.loadAll().then(rows1 => {
  cate = { danhsachsv1 : rows1};
  nsxRepo.loadAll().then(rows2 => {
    nsx = { danhsachsv2 : rows2};
              productRepo.loadAllTopSale().then(rows5 => {
                sale = { danhsachsv5 : rows5};
               
                   // var sdt = "0123456";
                    billRepo.loadAllsdt(sdt).then(rows => {
                         // console.log(rows);
                          var dulieu = { danhsachsv : rows};
                          
                         
                        res.render('history', { danhsach: dulieu, danhsach1: cate, danhsach2: nsx,  danhsach5: sale});

                      });
                       
                   //   });

        });
      });
  });
});

/* GET history page. */
router.get('/historydetail/:id', function(req, res, next) {
  var id = req.params.id;
  var date = req.query.date;

  //
var cate;
var nsx;
var ds1;
var ds2;
var sale;
var limit = 6;
var offset = 0;
var dulieu1; 

  productcateRepo.loadAll().then(rows1 => {
  cate = { danhsachsv1 : rows1};
  nsxRepo.loadAll().then(rows2 => {
    nsx = { danhsachsv2 : rows2};
              productRepo.loadAllTopSale().then(rows5 => {
                sale = { danhsachsv5 : rows5};
              
                   // var sdt = "0123456";
                    billInfoRepo.loadAllsdt(id, date).then(rows4 => {
                      console.log("+==================billInfoRepo======================== id: " + id);
                          console.log(rows4);
                          dulieu1 = { danhsachsv1 : rows4};
                         
                          productRepo.loadAll().then(rows => {
                            // console.log(rows);
                             var dulieu = { danhsachsv : rows};
                            
                             res.render('historydetail', { danhsach0: dulieu1, danhsach: dulieu, danhsach1: cate, danhsach2: nsx,  danhsach5: sale});

                         });

                      });
                       

        });
      });
  });
});
router.get('/cc', function(req, res, next) {
  var sdt = "01634777888";
  dob = "2018-07-07";
  var c = 19;
  billInfoRepo.single(sdt, dob, c).then(b => {
    console.log("======================b ===========================");
  console.log(b);
  console.log("bill num: " + b.num);
  });
  res.end("aa");
});
module.exports = router;
