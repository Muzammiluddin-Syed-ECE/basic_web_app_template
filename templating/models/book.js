var mongoose = require('mongoose');
const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var BookSchema = new Schema({

  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  
});

// Virtual for this book instance URL.
BookSchema.virtual('url').get(function() {
  return '/book/' + this._id;
});


// Export model.
module.exports = mongoose.model('Book', BookSchema);