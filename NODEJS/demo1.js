function Person() {
	this.message = "Hello node js 3";
	this.sayHello = function() {
	console.log(this.message);
	 }

}
module.exports = new Person();