var util = require("util"); //nodejs.org xem hàm có sẵn

var name = "hoa"
var message = util.format("Hello : %s", name);
util.log(message);


console.log(util.isArray([]));
console.log(util.isArray(new Array()));
console.log(util.isArray({}));


var url = require("url");

var urlInfo = url.parse("https://nodejs.org/dist/latest-v8.x/docs/api/");

console.log(urlInfo);



var arr = [2, 3, 4]
for(var x of arr)
	console.log(x, x == 3);

const a = 123;

console.log(a == 123);