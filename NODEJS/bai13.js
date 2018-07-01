const buf1 = new Buffer('this is a tést', 'utf-8'); /// amc dinh
console.log(buf1);
console.log(buf1.toString());
console.log(buf1.toString("ascii"));
console.log(buf1.toJSON());

console.log(buf1[2]);
buf1.write("hoa");
console.log(buf1.toString()); //hoa chao


var buffer = new ArrayBuffer(8); // 8 byte
var view = new Int32Array(buffer);


buffer[0] = 2 ;
buffer[1] = 10;
//buffer[2] = 10; // k co YN vi no chi co 8 byte thoi

console.log(buffer);

console.log("======== call back===========");
function readDB(callback) {
	//read done
	var user = {
		name: "mai hoa"
	}
	callback(user);
}


//query
readDB(function (data) {
	console.log("Read done callback 1");
	console.log("Data: ", data);

});

readDB(function (data) {
	console.log("Read done callback 2");
	console.log("Data: " + data.name);

});




