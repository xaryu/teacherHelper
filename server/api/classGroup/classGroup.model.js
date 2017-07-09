var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ClassGroups = new Schema({
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
    }
})

ClassGroups.virtual('groupStudents', {
    ref: 'Students',
    localField: '_id',
    foreignField: 'grupa'
},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})

module.exports = mongoose.model('Groups', ClassGroups, 'Groups');