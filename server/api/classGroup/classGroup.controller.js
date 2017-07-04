'use strict';

var ClassGroups = require('./classGroup.model');

exports.createGroup = function(req, res) {
    console.log(req.body);
    var classGroup = new ClassGroups({ 
        name: req.body.name,
        nrMinimPrezente: req.body.nrMinimPrezente,
        proiectObligatoriu: req.body.proiectObligatoriu,
        nrTeme: req.body.nrTeme,
        nrSaptamani: req.body.nrSaptamani
    });

    classGroup.save(function(err) {
        if(err) {
            res.send(err);
        }
        res.json({message: 'Classgroup created!' });
    });
};

exports.getGroups = function(req, res) {
    console.log('here');
    ClassGroups.find(function(err, groups) {
        if(err) {
            res.send(err);
        }
        res.json(groups);
    });
};

exports.getGroupById = function(req, res) {
    ClassGroups.findById(req.params.group_id, function(err, group) {
        if(err) {
            res.send(err);
        }
        res.json(group);
    });
};

exports.changeGroupById = function(req, res) {
    ClassGroups.findById(req.params.group_id, function(err, group) {
        if(err) {
            res.send(err);
        }

        group.name = req.body.name;

        //save the group
        group.save(function(err){ 
            if(err) {
                res.send(err);
            }
            res.json({message: 'Group updated!' });
        });
    });
};

exports.deleteGroup = function(req, res) {
    ClassGroups.remove({
        _id: req.params.group_id
    }, function(err, group) {
        if(err) {
            res.send(err)
        }
        res.json({message: 'Successfully deleted'});
    });
};