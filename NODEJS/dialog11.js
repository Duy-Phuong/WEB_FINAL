
'use strict';
var Emitter =  require("events"); // thu vien san co cua node js

module.exports = class Dialog extends Emitter{
	constructor(){
		super();
		this.message = "message ";
		
	}

	say(data) {
			console.log(`${this.message}: ${data}`);
			this.emit("hello", data);
		}
}