var mongoose = require('mongoose');
const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var BookSchema = new Schema({

  id: kid,
  id1: kid1,
  
});

// Virtual for this book instance URL.
BookSchema.virtual('url').get(function() {
  return '/book/' + this._id;
});


// Export model.
module.exports = mongoose.model('Book', BookSchema);