//open
var fs = require("fs");

// //open
// fs.open("text.txt", "r+", function (err, file) {
// 	if(err){
// 		console.log('open file err');
// 		return;
// 	}

// 	console.log('open file successfully');
// });

// //read
// var data = fs.readFileSync("text.txt");
// console.log('noi dung file la: ', data.toString() );

// fs.readFile("text.txt", function (err, data) {
// 	if(err){
// 		console.log('open file err');
		
// 	}else{
// 		console.log('noi dung file la: ', data.toString() );
// 	}
// });


//ghi file
// fs.writeFile("text.txt", "New content", function (err) {
// 	if(err){
// 		console.log('write file error');
// 	}else{
// 		fs.readFile("text.txt", function (err, data) {
// 			if(err){
// 				console.log('read file err');
				
// 			}else{
// 				console.log('noi dung file la: ', data.toString() );
// 			}
// 		});
// 	}
// });

//tao folder
fs.mkdir("new_folder", function (err) {
	if(err){
		console.log('err');
	}else{
		console.log('success');
	}
});