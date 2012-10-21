module.exports = function(app) {
	function process(req,res){
    	var session = req.session,
            user = session.user;

		return({
		viewName: "demo",
		baseTemplate: 'base',
		data: {
			session:session,                   
            title: 'Demo'
			}
		});
    }


	 app.get('/demo', function(req, res){

	 		var json = process(req,res);

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

