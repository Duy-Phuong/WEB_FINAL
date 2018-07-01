var fs = require("fs"); //read file
//han che sd vi doc rat lau
var content = fs.readFileSync(__dirname + "/text.txt", "utf-8");
console.log(content);


//cach 2
fs.readFile(__dirname + "/text.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});


  console.log("=======================");

//chunk
var readable = fs.createReadStream(__dirname + "/text.txt", {
	encoding: "utf8",
	highWaterMark: 16*1024
});

var writeable = fs.createWriteStream(__dirname + "/textcopy.txt");

readable.on("data", function (chunk) {
  console.log(chunk.length);
  writeable.write(chunk);
});
