var util = require( 'util' );

module.exports.show = function ( req, res ) {
  res.render( 'profile.ejs', { user: req.session.user, title: 'profile' } );
}