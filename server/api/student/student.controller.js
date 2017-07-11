'use strict';
var request = require('request');
var Student = require('./student.model');
var {ObjectId} = require('mongodb');

exports.createStudent = function(req, res) {
    var safeObjectId = string => ObjectId.isValid(string) ? new ObjectId(string) : null;
    let groupId = safeObjectId(req.body.groupId);
    var newStudent = new Student({
        nume: req.body.nume,
        prenume: req.body.prenume,
        nrPrezente: req.body.nrPrezente,
        notaProiect: req.body.notaProiect,
        notaTest: req.body.notaTest,
        notaTeme: req.body.notaTeme,
        grupa: groupId
    })

    newStudent.save((err) => {
        if(err) {
            res.send(err);
        }
        res.json(newStudent);
    })
};

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
        student.notaTeme = req.body.notaTeme;

        student.save(function(err){ 
            if(err) {
                res.send(err);
            }
            res.json(student);
        });
    });
};

exports.deleteStudent = function(req, res) {
    Student.remove({
        _id: req.params.student_id
    }, function(err, group) {
        if(err) {
            res.send(err)
        }
        res.json({message: 'Successfully deleted'});
    });
};