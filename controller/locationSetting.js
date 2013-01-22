module.exports = function(app) {


	 function processThis(req,res){
	 	 var session = req.session,
                user = session.user;
	   // var user = new UserModel("John", "Appleseed");
		return({
				viewName: "locationSetting",
				baseTemplate: 'base',
				data: {
					session:session,                   
            		title: 'location setting'
				}
			});     
    }
    
	app.post('/locationSetting', function(req, res) {
		console.log("location setting--------------------------------------post controller");
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



  	function processLocationSetting(req,res){
    	 var session = req.session,
                user = session.user;

		return({
		viewName: "locationSetting",
		baseTemplate: 'base',
		data: {
			session:session,                   
            title: 'location setting'
		}

		});
    }


	 app.get('/locationSetting', function(req, res){
	 	console.log("location setting--------------------------------------get controller");
 			var json = processLocationSetting(req,res);
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

