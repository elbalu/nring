var express = require('express'), 
	http = require('http'), 
	_ = require('underscore')._,
	engines = require('consolidate'),
	path = require('path'),
	less = require('less'),
	fs = require('fs'),
	auth= require('connect-auth'),
	passport = require('passport'),
	dust = require('dustjs-linkedin'),
	FacebookStrategy = require('passport-facebook').Strategy;
	

require('dustjs-helpers');



//var RedisStore = require('connect-redis');


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
	clientID: '226754337433632',
	clientSecret: 'eacf1c10be67306ffbfecddc626a2aa0',
	callbackURL: "http://elbalu.in:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));



var app = express();

app.engine('dust', engines.dust);

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/');
	app.set('view engine', 'dust');
	app.set('template_engine', dust);
	app.use(express.favicon());
	app.use(express.logger('short'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	//app.use(express.cookieDecoder());
	app.use(express.session({ secret: 'foo bar' }));
	app.use(passport.initialize());
  	app.use(passport.session());
	app.use(app.router);
	app.use(require('less-middleware')({ src: __dirname + '/public' }));
	app.use(express.static(path.join(__dirname, '/public')));
	
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

fs.readdir('./controller', function(err, files){
    files.forEach(function(fn) {
        if(!/\.js$/.test(fn)) return;
        require('./controller/' + fn)(app);
    });
});


app.listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

