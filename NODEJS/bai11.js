var Dialog = require("./dialog11.js");

var dialog = new Dialog();

dialog.on("hello", function(data) {
	console.log(" events: " + data);
});

dialog.say("Hoa");