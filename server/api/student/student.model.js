var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Students = new Schema({
    nume: String,
    prenume: String,
    grupa: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
})

module.exports = mongoose.model('Student', Students);