var mongoose = require('mongoose')
	, config = require('../config')
	, Schema = mongoose.Schema
 	, ObjectId = mongoose.SchemaTypes.ObjectId;

mongoose.connection.on('error', function (err) {
  console.log(err);
});

mongoose.connection.on('open', function () {
  console.log('connected');
});

mongoose.connect(config.development.dbUrl);


var userSchema = new Schema({
	fbId: String,
	name: String,
	email:{ type: String, lowerCase: true},
	username: String
});


try{
	User=mongoose.model('User');
}catch(e){
	User= mongoose.model('User', userSchema)
}
module.exports = User;