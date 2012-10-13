/*global exports:true, module:true, require:true */
var UserModel = require('../model/userModel');


module.exports = function(app) {

    function processThis(req,res){
	    var user = new UserModel("John", "Appleseed");
		return({
				viewName: "loggedin",
				baseTemplate: 'base',
				data: {
					firstName: user.firstName,
					lastName: user.lastName
				}
			});     
    }
    
	app.post('/loggedin', function(req, res) {
		var json = processThis(req,res);
		
		if(req.header('X-Requested-With') == 'XMLHttpRequest') {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.write(JSON.stringify(json));
			res.end();
		}
		else {
			res.render("public/templates/" + json.baseTemplate,json);
		}
	});
	
}
