//tao 1 server
var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
	// res.writeHead(200, {'Content-Type': 'text/plain'}); //mã lỗi là 200
	// res.end("hello");

		res.writeHead(200, {'Content-Type': 'text/html'}); //mã lỗi là 200
	//cach 1	
		// var html = fs.readFileSync(__dirname + "/index.html", "utf8");
		
		// var user = "Phuong";
		// html = html.replace("{user}", user);
		// res.end(html);


//SD kĩ thuật stream để cải thiện hiệu năng để SD bộ nhớ HQ nhất
// cách 2 dọc được phần nào pipe phần đó nên nhanh hơn
		fs.createReadStream(__dirname + "/index.html").pipe(res);

		

}).listen(1337, "127.0.0.1")