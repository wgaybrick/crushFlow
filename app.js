/*
 * Module dependencies.
 */

var express = require( 'express' )
  , routes = require( './routes.js' )
  , socket_listeners = require( './socket_listeners.js' )
	, mongoose = require( 'mongoose' );

var app = module.exports = express.createServer()
  , io = require( 'socket.io' ).listen( app );

// assuming io is the Socket.IO server object
io.configure( function () { 
  io.set( "transports", ["xhr-polling"] ); 
  io.set( "polling duration", 10 ); 
} );

var posts_controller = require( './controllers/posts_controller.js' )
var MemStore = express.session.MemoryStore;

// Configuration
app.configure(function () {
  app.set( 'views' , __dirname + '/views' );
  app.set( 'view engine', 'ejs' );
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );

  app.use( express.static(__dirname + '/public') );

  // Session config below
  app.use( express.cookieParser() );
  app.use( express.session( { secret: 'a_super_secret_password_here', store: MemStore( {
    reapInterval: 60000 * 10
  } ) } ) );
  
  app.use( app.router );
  
  app.dynamicHelpers( {
    session: function( req, res ) {
      return req.session;
    },
    
    flash: function( req, res ) {
      return req.flash(); // Fetches contents of and clears flash
    }
  } );
});

app.configure( 'development', function () {
  app.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );
	var mongoose_uri = 'mongodb://localhost/crushFlow';
	mongoose.connect( mongoose_uri );
} );

app.configure( 'production', function () {
  app.use(express.errorHandler() ); 
	var mongoose_uri = 'mongodb://heroku:crushFlowAdmin@staff.mongohq.com:10084/app1737733';
	mongoose.connect( mongoose_uri );
} );


// Attach routes
routes.attach_routes( app );

// Attach socket listeners
io.sockets.on( 'connection', function ( socket ) {
  
  for ( var i = 0; i < socket_listeners.length; i++ ) {
    
    var event = socket_listeners[ i ][ 'event' ];

    var handler = socket_listeners[ i ][ 'handler' ];
    
    socket.on( event, function ( data ) {
    
      handler( data, socket );
    
    } );
    
  }
  
} );



var port = process.env.PORT || 3000;

app.listen( port );
console.log( "Express server listening on port %d in %s mode", app.address().port, app.settings.env );
