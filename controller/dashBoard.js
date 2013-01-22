module.exports = function(app) {


	 function processThis(req,res){
	 	 var session = req.session,
                user = session.user;
	   // var user = new UserModel("John", "Appleseed");
		return({
				viewName: "dashBoard",
				baseTemplate: 'base',
				data: {
					session:session,                   
            		title: 'Dash Board'
				}
			});     
    }
    
	app.post('/dashBoard', function(req, res) {
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



  	function processDashBoard(req,res){
    	 var session = req.session,
                user = session.user;

		return({
		viewName: "dashBoard",
		baseTemplate: 'base',
		data: {
			session:session,                   
            title: 'location setting'
		}

		});
    }


	 app.get('/dashBoard', function(req, res){
	 	console.log("location setting--------------------------------------get controller");
 			var json = processDashBoard(req,res);
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

