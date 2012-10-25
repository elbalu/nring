module.exports = function(app) {
       


	 app.get('/', function(req, res){
        // console.log("---success-----");
        // console.log(req.user);
        var session = req.session,
                user = session.user;

        req.model = {
                viewName: 'home',
                master: 'public/templates/base',
                data: {
                    session:session,                   
                    title: 'home'
                }
         };
          console.log("---index session-----");
        console.log(session);
          console.log("---index session.passport.user.emails-----");
        console.log(session.passport.user);
       res.render(req.model.master, req.model);

    });




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
    
	app.post('/login', function(req, res) {
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

