var http = require('http'); 
var fs = require('fs');
http.createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/html; charset=utf-8"});
    fs.ReadStream("giaodien.html").pipe(res);

    console.log(req.url); /// là /

    console.log("server dang chay");
}).listen(3000);