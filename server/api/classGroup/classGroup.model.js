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
    groupMembers: {
        type: Object
    }
})

//TODO reference to students model(deep populate)

// Schema.plugin(deepPopulate, {
//     whitelist: ['student.std']
// });

module.exports = mongoose.model('Group', ClassGroups)