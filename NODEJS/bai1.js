var x = 1;
var y = 2;
var z = x + y;
console.log(z);

function say() {
	console.log('chao cac ban');
}
say();

//first class func đóng vt như para
function sayHello(fn) {
	// body...
	fn();
}

sayHello(say);

// như 1 biến
var sayGoo = function () {
	// body...
	console.log('Good bye');
 }

sayGoo();

//truyền hàm tt vào lời gọi hàm
sayHello(function () {
	console.log('this is a expression!');
}); 
//viideo 13
var sayGoo1 = require("./demo.js"); /*cùng cấp,, có thể bỏ cái ,js cx dk*/

sayGoo1();

//===========================================
//video 14 ôn lại js
var person = {
	firstName: "Nam", 
	lastName: "Tran",
	fullName: function() {
		 return this.firstName + " " + this.lastName;
	},
	say1: function() {
		console.log('Obj literal');
	}

}

console.log("=========JS ========");
var keyName = "firstName";
console.log(person.firstName);
console.log(person[keyName]);
console.log(person.fullName());
person.say1();

//=========================================== khai báo theo kiểu obj literal
//=========================================== kế thừa prototype
function Person(name, pass) {
	this.name = name;
	this.pass = pass;
}

Person.prototype.getName = function(){
	return this.name; 
}

Person.prototype.getPass = function(){
	return this.pass; 
}

Person.prototype.getLevel = function(){
	return this.level; 
}

Person.prototype.level = "admin";

function User(name) {
	this.name = name;
	
}

//

User.prototype = new Person(); //user có thể SD các ham của person

var person1 = new Person("Ti", "163");
var user = new User("Teo", "123");
console.log("=========video 15 ========");

console.log(user.getName());
console.log(user.getLevel());
console.log(user.getPass()); ///vi trong hàm tạo k có thuocj tinh pass nên xuất ra undentified


//================================================ lấy ra ngày

Date.prototype.vnFormat = function(){
	var yyyy = this.getFullYear();
	var mm = this.getMonth() + 1;
	var dd = this.getDate();

	return dd + "/" + mm + "/" + yyyy;
};


var now = new Date();
var xm = new Date(2016, 11, 31);


console.log('format date');
console.log(now.vnFormat());
console.log(xm.vnFormat());


//================================================ pass by value and pass by ref
function change1(a) {
	a = 1;
}

var b = 0;
change1(b);
console.log("ket qua truyen tham tri(b ban dau la 0) sau khi gan = 1 in func: " + b);
//sao chép b =  a nhưng trỏ đén cùng 1 vùng nhớ
function change2(obj) {
	obj.name1 = function() {};
	obj.newO = {}; // thêm 1 tt mới
	obj.d = 100;
}

var obj = {};
obj.name1 = {};
console.log("ket qua truyen tham chieu: ");

change2(obj);
console.log(obj);


//scope là pham vi truy cap của biến
var ten3 = "Nam3";

//hma khoi tao se duoc thuc hien truoc tien
(function(lastname){
	var ten = "Binh1";
	console.log(ten);
	console.log(ten3);

	console.log(lastname);
}("Hoa2"));

console.log(ten3);
//================================================ bài 18 giải thích module
// JSON
[
{
	"name" : "An",
	"age" : 27
},
{
	"name" : "Binh",
	"age" : 27
}
]

//================================================