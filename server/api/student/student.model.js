var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Student = new Schema({
    nume: String,
    prenume: String,
    nrPrezente: {
        type: Number,
        default: 0
    },
    notaProiect: {
        type: Number,
    },
    notaTest: Array,
    notaTeme: Array,
    notita: {
        type: String
    },
    grupa: { type: mongoose.Schema.Types.ObjectId, ref: 'Groups' }
})

module.exports = mongoose.model('Students', Student, 'Students');