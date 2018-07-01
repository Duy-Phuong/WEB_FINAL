
//in ra mảng và obj bằng nhiu cách
var obj = {
	name: "hello"
}

console.log(obj.name);
console.log(obj['name']);
var s = "name";
console.log(obj[s]);

console.log("============");

var arr = [];
arr.push(function(){
	console.log("hello 1");
});


arr.push(function(){
	console.log("hello 2");
});

arr.push(function(){
	console.log("hello 3");
});

arr[0]();
arr[1]();
arr[2]();

console.log("============");

arr.forEach(function(item){
	item();
});