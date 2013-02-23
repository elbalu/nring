module.exports = function(app) {
       


	 app.get('/', function(req, res){
        var session = req.session,
                user = session.user;
        req.model = {
                viewName: 'home',
                master: 'public/templates/base',
                data: {
                    session:session,                   
                    title: 'home',
                    user:{
                    	fname:'balu',
                    	newUser:true
                    },
                    posts:[
	                    {
	                    	type:'ga'

	                    },
	                    {
	                    	type:'lend'
	                    },
	                    {
	                    	type:'ga'

	                    },
	                    {
	                    	type:'lend'
	                    },
	                    {
	                    	type:'lend'

	                    },
	                    {
	                    	type:'lend'
	                    },
	                    {
	                    	type:'lend'

	                    },
	                    {
	                    	type:'lend'
	                    },
	                    {
	                    	type:'ga'

	                    },
	                    {
	                    	type:'ga'

	                    },
	                    {
	                    	type:'ga'

	                    },
	                    {
	                    	type:'ga'

	                    }
	                    ]

                    
                }
         };
       res.render(req.model.master, req.model);

    });


	 app.get('/posts', function(req, res){
        var session = req.session,
                user = session.user;

        req.model = {
                viewName: 'post',
                master: 'public/templates/base',
                data: {
                    session:session,                   
                    title: 'posts',
                    posts:[
	                    {
	                    	type:'ga'

	                    },
	                    {
	                    	type:'lend'
	                    },
	                    {
	                    	type:'ga'

	                    },
	                    {
	                    	type:'lend'
	                    },
	                    {
	                    	type:'lend'

	                    },
	                    {
	                    	type:'lend'
	                    },
	                    {
	                    	type:'lend'

	                    },
	                    {
	                    	type:'lend'
	                    },
	                    {
	                    	type:'ga'

	                    },
	                    {
	                    	type:'ga'

	                    },
	                    {
	                    	type:'ga'

	                    },
	                    {
	                    	type:'ga'

	                    }
	                    ]

                    
                }
         };
       res.render(req.model.master, req.model);

    });


 app.get('/lib', function(req, res){
        var session = req.session,
                user = session.user;

        req.model = {
                viewName: 'lib',
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
	                    ]

                    
                }
         };
       res.render(req.model.master, req.model);

    });


    function processThis(req,res){
	    var user = new UserModel("John", "Appleseed");
		return({
				viewName: "loggedin",
				baseTemplate: 'base',
				data: {
					firstName: user.firstName,
					lastName: user.lastName
				}
			});     
    }
    
	app.post('/login', function(req, res) {
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

