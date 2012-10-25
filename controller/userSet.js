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
	 	console.log("user set---------------------------------------get controller")
 		var json = processUserSetting(req,res);
	 	// 	json.layout= false;
			// json.lat=lat;
			// json.lon=lon;
			// json.zoom=zoom;
			//json.geohash=req.params["id"];
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

