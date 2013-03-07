   


module.exports = function(app) {

   
    app.get('/loggedin', function(req, res){
      var session = request.session
          , user = session.user;

    	req.model = {
                viewName: 'home',
                master: 'public/templates/base',
                data: {
                    session:session,                   
                    title: 'lib',
                    rack:[
	                    {
	                    	category:'book',
	                    	avaliable:true,
	                    	name:'the book'

	                    }
	                    ],
	                   user: req.user

                    
                }
         };
       res.render(req.model.master, req.model);
    });

	app.get('/logout', function(req, res){
		 var session = req.session,
            user = session.user;
          req.logOut();
          delete session.user;
          res.redirect('/');
        });
	
}