module.exports = function(app) {


    function processSocialLibLanding(req,res){
    	 var session = req.session,
                user = session.user;
		return({
				viewName: "socialLib",
				baseTemplate: 'base',
				data: {
					session:session,                   
                    title: 'user Settings'
				}
			});     
    }
    	
	app.get('/socialLib', function(req, res) {
		var json = processSocialLibLanding(req,res);
		
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

