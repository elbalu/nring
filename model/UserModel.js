UserModel = function() {
	this.firstName = null;
	this.lastName = null;
};

UserModel = function(firstName, lastName) {
	this.firstName = firstName;
	this.lastName = lastName;
};

module.exports = UserModel;
