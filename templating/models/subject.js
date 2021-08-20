var mongoose = require('mongoose');
const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

var SubjectSchema = new Schema({

  id: kid,
  id1: kid1,
  
});

// Virtual for this subject instance URL.
SubjectSchema.virtual('url').get(function() {
  return '/subject/' + this._id;
});


// Export model.
module.exports = mongoose.model('Subject', SubjectSchema);