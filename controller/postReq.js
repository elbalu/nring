module.exports = function(app) {
       


    function processpostReqting(req,res){
    	 var session = req.session,
                user = session.user;

		return({
		viewName: "postReq",
		baseTemplate: 'base',
		data: {
			session:session,                   
                    title: 'post request'
		}
		});
    }


	 app.get('/postReq', function(req, res){

	 		var json = processpostReqting(req,res);

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

