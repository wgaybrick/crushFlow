var posts_controller = require( './controllers/posts_controller.js' );

var routes = [

	{ method: "get", path: "/", handler: posts_controller.index },
	{ method: "post", path: "/", handler: posts_controller.create_post }

]

function attach_routes( server ) {
  
  for ( var i = 0; i < routes.length; i++ ) {
  	var method = routes[ i ][ "method" ];
  	var path = routes[ i ][ "path" ];
  	var handler = routes[ i ][ "handler" ];
  	server[ method ]( path, handler );
  }
  
}


module.exports.attach_routes = attach_routes;
