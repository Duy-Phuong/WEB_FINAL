var person = {
	firstName: "", 
	lastName: "",
	fullName: function() {
		 return this.firstName + " " + this.lastName;
	},
	say1: function() {
		console.log('Obj literal');
	}

}

var hoa = Object.create(person); // tao ra 1 obj
hoa.firstName = "Tran";
hoa.lastName = "Hoa";

console.log(hoa.fullName());