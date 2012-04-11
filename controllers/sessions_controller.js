var util = require( 'util' );
var users = require( '../users.js' );

/*
 * Handler for the login page
 */
module.exports.new = function( req, res ) {
  res.render( 'sessions/new', { redir: req.query.redir, title: "login" } );
}

module.exports.authenticate = function ( req, res ) {

  var user = users[ req.body.login ];
  
  if ( user && user.password == req.body.password ) {
    req.session.user = user;
    res.redirect( req.body.redir || '/' );
  } else {
    req.flash( 'warn', 'Login failed' );

    res.render( 'sessions/new', { redir: req.body.redir, title: 'login' } );
  }
  
  return;
  
};

module.exports.logout = function( req, res ) {
  delete req.session.user;
  res.redirect( '/' );
}