var person = {
	name:"an",
	tuoi: 21

}

console.log(`ten: ${person.name} va tuoi ${person.tuoi + 1}
	xuong dong `);


var obj = {
	name:"an",
	say: function (param1, param2) {
		console.log(`ten: ${this.name}`);
		console.log("param: ", param1, param2);
	}

}

obj.say("hello", "21");
obj.say.call({ name: "b"}, "hello", "22"); // truyen vao ds
obj.say.apply({ name: "c"}, ["hello", "23"]);  // truyen vao 1 array ney laf apply

