var mongoose = require('mongoose');
const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var BooksSchema = new Schema({

  <schema_props>dem: <key_description>,
  
});

// Virtual for this books instance URL.
BooksSchema.virtual('url').get(function() {
  return '/books/' + this._id;
});


// Export model.
module.exports = mongoose.model('Books', BooksSchema);