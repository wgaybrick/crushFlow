var posts_controller = require( './controllers/posts_controller.js' );
var sessions_controller = require( './controllers/sessions_controller.js' );
var users_controller = require( './controllers/users_controller.js' );
var users = require( './users.js' );


function requiresLogin( req, res, next ) {
  if ( req.session.user ) {
    next(); // User is logged in -- proceed as requested
  } else {
    res.redirect( '/sessions/new?redir=' + req.url ); // Redirect to login page
  }
}
 
var routes = [

	  { method: "get", path: "/", handler: posts_controller.index }
	, { method: "post", path: "/", handler: posts_controller.create_post }
	, { method: "get", path: "/profile", handler: users_controller.show, requiresLogin: true }
	
	  // Sessions routes
	, { method: "get", path: "/sessions/new", handler: sessions_controller.new }
  , { method: "post", path: "/sessions/new", handler: sessions_controller.authenticate }
  , { method: "get", path: "/sessions/destroy", handler: sessions_controller.logout }
]

function attach_routes( server ) {
  
  for ( var i = 0; i < routes.length; i++ ) {
  	var method = routes[ i ][ "method" ];
  	var path = routes[ i ][ "path" ];
  	var handler = routes[ i ][ "handler" ];
  	
  	if ( routes[ i ][ "requiresLogin" ] ) {
  	  server[ method ]( path, requiresLogin, handler );
  	} else {
  	  server[ method ]( path, handler );
  	}

  }
  
}


module.exports.attach_routes = attach_routes;
