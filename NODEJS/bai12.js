var first = function () {
	console.log("I am the first");
}

var second = function () {
	setTimeout(first, 3000); // 3s sau moi in
	console.log("I am the second");
}

second();