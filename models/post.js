var mongoose = require( 'mongoose' )
	, Schema = mongoose.Schema;
	
var postSchema = new Schema( {
		title		: String
	,	content	: String
	,	date    : { type: Date, default: Date.now }
} );

postSchema.methods.date_display = function ( cb ) {
	var date = this.date.getDate();
	var month = this.date.getMonth() + 1;
	var year = this.date.getFullYear();
	var dateString = month + "/" + date + "/" + year;
	return dateString;
};

postSchema.methods.date_utc = function ( cb ) {
		var t = this.date;
		var dateString = new Date(t.getUTCFullYear() , t.getUTCMonth() , t.getUTCDate() ,  t.getUTCHours() , t.getUTCMinutes() , t.getUTCSeconds());
		return dateString;
};
module.exports = mongoose.model( 'Post', postSchema );