function Person() {
	this.message = "Hello node js 4";
	this.sayHello = function() {
	console.log(this.message);
	 }

}
module.exports = Person;