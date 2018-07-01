var greet = require("./greet"); 

greet.english();
greet.viet();

// video 21
var bai3 = require("./demo3.js");
bai3();

var bai3_2 = require("./demo2.js").thuoctinh;
bai3_2();

var bai3_3 = require("./demo1.js");
bai3_3.sayHello();

bai3_3.message = "new";

var bai3_4 = require("./demo1.js"); //chi thay doi tt message
bai3_4.sayHello();


var bai3_5 = require("./demo0.js"); // k sd toan tu new
var hello = new bai3_5();
hello.sayHello();

var bai3_6 = require("./demo5.js").sayHello; //trả về tt
bai3_6();