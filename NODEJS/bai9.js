
var util = require("util"); //nodejs.org xem hàm có sẵn

function Person () {
	this.firstName = "Hoa", 
	this.lastName = "mai"	

}

Person.prototype.say1 = function() {
		console.log('name: ' + this.firstName + " " + this.lastName);
	}


function Student () {
	Person.call(this);
	this.id = "12"
}
 //ke thua

 util.inherits(Student, Person);

 var sv = new Student();
 sv.say1();