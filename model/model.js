// var mongoose = require('mongoose');
// mongoose.connection.on('error', function(err){
// 	console.log('error in connection--------');
// });
// mongoose.connect('localhost', 'test');
// var userSchema = new mongoose.Schema({
// 	firstname: String,
// 	lastname: String,
// 	email:{
// 		type: String,
// 		lowercase: true
// 	}
// });


// //Virtual

// userSchema.virtual('fullname').get(function(){
// 	return this.firstname + ' ' + this.lastname;
// });


// //validation

// userSchema.path('email').validate(function(value){
// 	var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
// 	return re.test(value);
// }, 'Invalid Email');


// module.exports = mongoose.model('User2', userSchema);