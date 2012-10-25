
var passport = require('passport');
var UserModel = require('../model/userModel');
module.exports = function(app) {
    // app.get('/auth/facebook', passport.authenticate('facebook', {
    //     scope: ['user_status', 'user_photos']
    //     }, {
    //     successRedirect: '/signin',
    //     failureRedirect: '/login'
    // }));


    app.get('/auth/facebook',
        passport.authenticate('facebook', {
        scope: ['user_status', 'user_photos']
        }, { display: 'popup' }),    
        function(req, res) {

        }
    );

    app.get('/auth/facebook/callback',
      passport.authenticate('facebook', { failureRedirect: '/failure' }),
      function(req, res) {        
        res.redirect('/success');
      });


    app.get('/failure', function(req, res){

        console.log("hoyyala");
    });

    app.get('/success', function(req, res){
        // console.log("---success-----");
        // console.log(req.user);
        var session = req.session,
                user = session.user;

        req.model = {
                viewName: 'home',
                master: 'public/templates/base',
                data: {
                    user: req.user, 
                    session:session,                   
                    title: 'login success'
                }
         };
          console.log("---session-----------------------------------------");
        console.log(session);
        console.log("---session.passport.user._json-----");
        console.log(session.passport.user._json.work[0]);
       res.render(req.model.master, req.model);

    });




    app.get('/signin', function(req, res) {
        // console.log('signin res');
        // console.log(res);
        res.render('public/templates/base', {
            viewName: "login"
        });

    });

    app.post('/signin', function(req, res) {
        //res.redirect('/login');
        console.log("post");

    });

}

