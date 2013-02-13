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




/*--------------LDAP_AUTH--------------*/

// var ldap = require('ldapjs');
// var LdapAuth = require('ldapauth');
// var server = ldap.createServer();

// var scheme = 'ldap',
//     ldap_host = 'some.ldap.server',
//     ldap_port = 389,
//     username = 'example\\balu',
//     password = 'SOMEPASS'
//     base = "OU=FOO,DC=US,DC=BAR,DC=com",
//     filter = "(&(objectclass=user)(sAMAccountName=someone))";

// server.listen(1389, function() {
//   console.log('LDAP server listening at %s', server.url);
// });

// function authorize(req, res, next) {
//   if (!req.connection.ldap.bindDN.equals('cn=root'))
//     return next(new ldap.InsufficientAccessRightsError());

//   return next();
// }


// var options = {
//     url: "ldap://0.0.0.0:1389",
//     adminDn: "uid=myadminusername,ou=users,o=example",
//     adminPassword: "mypassword",
//     searchBase: "ou=users,o=example",
//     searchFilter: "(uid={{username}})"
// };
// var auth = new LdapAuth(options);

// auth.authenticate(username, password, function(err, user) { console.log('username'); 
// 	console.log(username);
// console.log(err.message);
// console.log('user');
// console.log(user);
// });

// auth.close(function(err) { console.log('errorr'); })







var ldap = require('ldapjs');


///--- Shared handlers



///--- Globals

var SUFFIX = 'o=joyent';
var db = {};
var server = ldap.createServer();



server.bind('cn=root', function(req, res, next) {
  if (req.dn.toString() !== 'cn=root' || req.credentials !== 'secret')
    return next(new ldap.InvalidCredentialsError());

  res.end();
  return next();
});

server.add(SUFFIX, authorize, function(req, res, next) {
  var dn = req.dn.toString();

  if (db[dn])
    return next(new ldap.EntryAlreadyExistsError(dn));

  db[dn] = req.toObject().attributes;
  res.end();
  return next();
});

server.bind(SUFFIX, function(req, res, next) {
  var dn = req.dn.toString();
  if (!db[dn])
    return next(new ldap.NoSuchObjectError(dn));

  if (!dn[dn].userpassword)
    return next(new ldap.NoSuchAttributeError('userPassword'));

  if (db[dn].userpassword !== req.credentials)
    return next(new ldap.InvalidCredentialsError());

  res.end();
  return next();
});

server.compare(SUFFIX, authorize, function(req, res, next) {
  var dn = req.dn.toString();
  if (!db[dn])
    return next(new ldap.NoSuchObjectError(dn));

  if (!db[dn][req.attribute])
    return next(new ldap.NoSuchAttributeError(req.attribute));

  var matches = false;
  var vals = db[dn][req.attribute];
  for (var i = 0; i < vals.length; i++) {
    if (vals[i] === req.value) {
      matches = true;
      break;
    }
  }

  res.end(matches);
  return next();
});

server.del(SUFFIX, authorize, function(req, res, next) {
  var dn = req.dn.toString();
  if (!db[dn])
    return next(new ldap.NoSuchObjectError(dn));

  delete db[dn];

  res.end();
  return next();
});

server.modify(SUFFIX, authorize, function(req, res, next) {
  var dn = req.dn.toString();
  if (!req.changes.length)
    return next(new ldap.ProtocolError('changes required'));
  if (!db[dn])
    return next(new ldap.NoSuchObjectError(dn));

  var entry = db[dn];

  for (var i = 0; i < req.changes.length; i++) {
    mod = req.changes[i].modification;
    switch (req.changes[i].operation) {
    case 'replace':
      if (!entry[mod.type])
        return next(new ldap.NoSuchAttributeError(mod.type));

      if (!mod.vals || !mod.vals.length) {
        delete entry[mod.type];
      } else {
        entry[mod.type] = mod.vals;
      }

      break;

    case 'add':
      if (!entry[mod.type]) {
        entry[mod.type] = mod.vals;
      } else {
        mod.vals.forEach(function(v) {
          if (entry[mod.type].indexOf(v) === -1)
            entry[mod.type].push(v);
        });
      }

      break;

    case 'delete':
      if (!entry[mod.type])
        return next(new ldap.NoSuchAttributeError(mod.type));

      delete entry[mod.type];

      break;
    }
  }

  res.end();
  return next();
});

server.search(SUFFIX, authorize, function(req, res, next) {
  var dn = req.dn.toString();
  if (!db[dn])
    return next(new ldap.NoSuchObjectError(dn));

  var scopeCheck;

  switch (req.scope) {
  case 'base':
    if (req.filter.matches(db[dn])) {
      res.send({
        dn: dn,
        attributes: db[dn]
      });
    }

    res.end();
    return next();

  case 'one':
    scopeCheck = function(k) {
      if (req.dn.equals(k))
        return true;

      var parent = ldap.parseDN(k).parent();
      return (parent ? parent.equals(req.dn) : false);
    };
    break;

  case 'sub':
    scopeCheck = function(k) {
      return (req.dn.equals(k) || req.dn.parentOf(k));
    };

    break;
  }

  Object.keys(db).forEach(function(key) {
    if (!scopeCheck(key))
      return;

    if (req.filter.matches(db[key])) {
      res.send({
        dn: key,
        attributes: db[key]
      });
    }
  });

  res.end();
  return next();
});


function loadPasswdFile(req, res, next) {
  fs.readFile('etc/passwd', 'utf8', function(err, data) {

    if (err)
      return next(new ldap.OperationsError(err.message));

    req.users = {};

    var lines = data.split('\n');
    for (var i = 0; i < lines.length; i++) {
      if (!lines[i] || /^#/.test(lines[i]))
        continue;

      var record = lines[i].split(':');
      if (!record || !record.length)
        continue;

      req.users[record[0]] = {
        dn: 'cn=' + record[0] + ', ou=users, o=myhost',
        attributes: {
          cn: record[0],
          uid: record[2],
          gid: record[3],
          description: record[4],
          homedirectory: record[5],
          password: record[7],
          shell: record[6] || '',
          objectclass: 'unixUser'
        }
      };
    }

    return next();
  });
}

var pre = [authorize, loadPasswdFile];

function authorize(req, res, next) {
  console.log(req.connection.ldap.bindDN);
  if (!req.connection.ldap.bindDN.equals('cn=root'))
    return next(new ldap.InsufficientAccessRightsError());

  return next();
}


server.search('o=myhost', pre, function(req, res, next) {
  console.log('------res------');
  console.log(req.users);
  console.log('------res------');
  Object.keys(req.users).forEach(function(k) {
    console.log('------K------');
  console.log(k);
  console.log('------k------');
    if (req.filter.matches(req.users[k].attributes))
      console.log('------req.users[k]------');
  console.log(req.users[k]);
  console.log('------req.users[k]------');
      res.send(req.users[k]);
  });

  res.end();
  return next();
});


///--- Fire it up

server.listen(1389, function() {
  console.log('LDAP server up at: %s', server.url);
});