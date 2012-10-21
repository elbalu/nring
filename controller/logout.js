   


module.exports = function(app) {

   
    
	app.get('/logout', function(req, res){
		 var session = req.session,
            user = session.user;
          req.logOut();
          delete session.user;
          res.redirect('/');
        });
	
}