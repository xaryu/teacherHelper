'use strict';
var request = require('request');
var Student = require('./student.model');

// exports.createStudent = function(req, res) {

// };

exports.getStudents = function(req, res) {
    console.log('OANAZAVORANU');
}

exports.getGroups = function(req, res) {
    Student.find(function(err, groups) {
        if(err) {
            res.send(err);
        }
        res.json(groups);
    });
};

exports.editStudent = function(req, res) {
    Student.findById(req.params.student_id, function(err, student) {
        if(err) {
            res.send(err);
        }
        student.nume = req.body.nume;
        student.prenume = req.body.prenume;
        student.nrPrezente = req.body.nrPrezente;
        student.notaProiect = req.body.notaProiect;
        student.notaTest = req.body.notaTest;
        student.notaProiect = req.body.notaProiect;

        student.save(function(err){ 
            if(err) {
                res.send(err);
            }
            res.json(student);
        });
    });
};

exports.deleteStudent = function(req, res) {
    console.log('deleteStudent');
    Student.remove({
        _id: req.params.student_id
    }, function(err, group) {
        if(err) {
            res.send(err)
        }
        res.json({message: 'Successfully deleted'});
    });
};