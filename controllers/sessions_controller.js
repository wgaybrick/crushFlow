var util = require( 'util' );

/*
 * Handler for the login page
 */
module.exports.new = function( req, res ) {
  res.render( 'sessions/new', { locals: { redir: req.query.redir } } );
}