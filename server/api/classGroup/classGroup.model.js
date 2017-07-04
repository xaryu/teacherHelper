var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassGroups = new Schema({
    name: String,
    nrMinimPrezente: Number,
    proiectObligatoriu: {
        type: Boolean,
        default: false
    },
    nrTeme: {
        type: Number,
        default: 1
    },
    nrSaptamani: {
        type: Number,
        default: 14
    },
    // groupMembers: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Student',
    //     es_indexed: true
    // }
})

module.exports = mongoose.model('Group', ClassGroups)