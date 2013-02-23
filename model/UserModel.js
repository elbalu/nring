var mongoose = require('mongoose')
	, config = require('../config');

mongoose.connection.on('error', function(err){
	console.log('error in connection--------');
});
mongoose.connect('localhost', 'test');
var userSchema = new mongoose.Schema({
	fbId: String,
	name: String,
	email:{ type: String, lowerCase: true}
});


module.exports = mongoose.model('User', userSchema);