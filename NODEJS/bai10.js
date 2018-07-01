// function Person () {
// 	this.firstName = "Hoa", 
// 	this.lastName = "mai"	

// }

// Person.prototype.say1 = function() {
// 		console.log('name: ' + this.firstName + " " + this.lastName);
// 	}



'use strict';
class Person {
	constructor(firstName, lastName){
		this.firstName = firstName;
		this.lastName = lastName;
	}

	say(){
		console.log("Hello: " + this.firstName + " " + this.lastName);
	}
}

var hoa =  new Person("Hoa", "Mai");
hoa.say();

var hoa1 =  new Person("Hoa1", "Mai1");
hoa1.say();

console.log(hoa.__proto__); //tra ve the hien la kieu Person
console.log(hoa1.__proto__); //tra ve the hien
console.log(hoa.__proto__ === hoa1.__proto__); //tra e the hien
