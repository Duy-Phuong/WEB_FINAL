///video12
var http = require('http');

http.createServer(function(req, res){
   res.writeHead(200, {'Content-Type': 'text/plain'}); //mã lỗi là 200
   res.write('hello');
	res.end();
}).listen(1234);