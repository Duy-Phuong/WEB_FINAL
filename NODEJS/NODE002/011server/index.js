var http = require('http');
http.createServer(function(req,res){
    res.writeHead(200,{"content-type":"text/html; charset=utf-8"});
    res.write("<h1>Server da ket noi thanh cong, day la ket qua tra ve tu server</h1>");
    res.write("<h2>Nội dung trang web </h2>");
    res.write("<div class='header'>Nội dung trang header</div>");

    res.end();

}).listen(1234);

//localhost:1234