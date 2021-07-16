var mongoose = require('mongoose');
const { DateTime } = require("luxon");  //for date handling

var Schema = mongoose.Schema;

module.exports = function(model_template){
    var TemplateSchema = new Schema(model_template.schema);
    TemplateSchema
    .virtual('url')
    .get(function () {
        return model_template.path + this._id
    });
    return mongoose.model(model_template.name, TemplateSchema)
}