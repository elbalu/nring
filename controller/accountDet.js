module.exports = function(app) {
       


    function processUserSetting(req,res){
    	 var session = req.session,
                user = session.user;

		return({
		viewName: "accountDet",
		baseTemplate: 'base',
		data: {
			session:session,                   
                    title: 'Account Details'
		}
		});
    }


	 app.get('/accountDet', function(req, res){

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




   

}

