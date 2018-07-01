//var Emitter =  require("./emmiter.js");

var Emitter =  require("events"); // thu vien san co cua node js
var eventsConfig =  require("./config"); // thu vien san co cua node js


var emitter = new Emitter();

emitter.on(eventsConfig.BAD_SCORE, function () {
	console.log("1 môn nào đó bị điểm kém");
});


emitter.on(eventsConfig.BAD_SCORE, function () {
	console.log("đã có điểm kém");
});

var scores = [10, 4];
for( var s of scores){
	if(s < 5){
			console.log("điểm kém");
			emitter.emit(eventsConfig.BAD_SCORE);
	}
}
