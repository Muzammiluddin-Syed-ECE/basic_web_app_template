var mongoose = require('mongoose');
const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var SchoolSchema = new Schema({

  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  
});

// Virtual for this school instance URL.
SchoolSchema.virtual('url').get(function() {
  return '/school/' + this._id;
});


// Export model.
module.exports = mongoose.model('School', SchoolSchema);