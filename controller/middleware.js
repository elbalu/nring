module.exports = function(app) {
/*middleware to see authenticate user */
 function authenticatedUser(req, res, next){
  if(req.isAuthenticated())
    return next();
  res.redirect('/');
 }
}