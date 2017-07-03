var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassGroups = new Schema({
    name: String
})

module.exports = mongoose.model('Group', ClassGroups)