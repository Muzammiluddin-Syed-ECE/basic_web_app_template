var mongoose = require('mongoose');
const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var SubjectSchema = new Schema({

  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  
});

// Virtual for this subject instance URL.
SubjectSchema.virtual('url').get(function() {
  return '/subject/' + this._id;
});


// Export model.
module.exports = mongoose.model('Subject', SubjectSchema);