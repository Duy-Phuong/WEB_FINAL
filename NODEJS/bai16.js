//tao 1 server
var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
	
	if(req.url === "" || req.url === "/index.html"){
				fs.createReadStream(__dirname + "/index.html").pipe(res);

			}else if(req.url === "/api") {
		res.writeHead(200, {'Content-Type': 'text/html'}); //mã lỗi là 200

		var obj = {
			firstName: "Hoa",
			lastName:"Mai"
		}
		//biến global để thao tác vs JSON

		res.end(JSON.stringify(obj)); //để convert sang kiểu string

	}else{
	 res.writeHead(404); //mã lỗi là 200
	 res.end("Not found");
		}
		
//truyền vào 1 hàm callback khi chạy xong sẽ auto gọi
}).listen(1337, "127.0.0.1", function(){
	console.log("server listenig on: localhost:1337")
})

//ctrl c để thoát