$(  document).ready( function () {
    
    //what happens when you click the new crush button?
    $('#new_crush_button').click( insertNewPost );
    
    //what happens when you click the submit post button?
    $('#submit_post').click( ajaxPost );
    
    
    // This code handles the default placeholder text
    $( '.defaultText' ).focus( function () {
        if ( $( this ).val() === $( this ).attr( "alt" ) )
        	$( this ).val( "" );
    } );  
    $( '.defaultText' ).blur( function () {
        if ( $( this ).val() === "" )
        	$( this ).val( $( this ).attr( "alt" ) );
    } );
    // End placeholder code
    
});

// Hide new post button and show insert post form
function insertNewPost() {
	$( '#new_crush_box' ).show();
	$( '#new_crush_button' ).hide();
}

// Create post using ajax
function ajaxPost() {
  var title = $( this ).siblings( 'input' ).val();
  var content = $( this ).siblings( 'textarea' ).val();
  
	$.post(
		"/",
		{ post: { title: title, content: content } },
		function (data) {
			
			// Clone an existing post, and set values of the new post
		  $new_post = $( '.postbox' ).first().clone();
		  $new_post.find( '.post_title' ).html( title );
		  $new_post.find( '.post_body' ).html( content );
		  $new_post.find( '.post_time' ).html( 'just now.' );

			// Hide the new post so we can slide it down nicely
			$new_post.css( 'display', 'none' );	
			
		  // Insert the new post in the page
		  $( '#new_crush_box' ).after( $new_post );

		  // Finally, slide in the new post, hide the new_post box,
		 	// and re-show the add a crush button
			$( '#new_crush_box' ).hide();
			$( '#new_crush_button' ).show();
			$new_post.slideDown( 'slow', function () {
			} );
		}
	);
}