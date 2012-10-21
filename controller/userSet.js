module.exports = function(app) {
       


    function processUserSetting(req,res){
    	 var session = req.session,
                user = session.user;

		return({
		viewName: "userSet",
		baseTemplate: 'base',
		data: {
			session:session,                   
                    title: 'user setting'
		}
		});
    }


	 app.get('/userSet', function(req, res){

	 		var json = processUserSetting(req,res);

				if(req.header('X-Requested-With') == 'XMLHttpRequest') {
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.write(JSON.stringify(json));
				res.end();
				}
				else {
				res.render("public/templates/" + json.baseTemplate,json);
				}



    });




    function processThis(req,res){
	    var session = req.session,
                user = session.user;
		return({
				viewName: "userSet",
				baseTemplate: 'base',
				data: {
					session:session,                   
                    title: 'user Settings'
				}
			});     
    }
    
	app.post('/userSet', function(req, res) {
		console.log('------------------userSet');
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

