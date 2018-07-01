var Emitter =  require("events"); // thu vien san co cua node js
var util = require("util");

function Dialog() {
	Emitter.call(this);
	this.message = "message ";
}

//ke thua
util.inherits(Dialog, Emitter);

Dialog.prototype.say = function (data) {
	console.log(this.message + ": " + data);
	this.emit("hello", data);
}

var dialog = new Dialog();

dialog.on("hello", function(data) {
	console.log(" events: " + data);
});

dialog.say("Hoa");