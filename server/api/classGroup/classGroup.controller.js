'use strict';
var request = require('request');
var ClassGroups = require('./classGroup.model');
var fs = require('fs');
var Baby = require('babyparse');

exports.createGroup = function(req, res) {
    this.parseCsv = function (body) {
        var csvParsed = false;
        return new Promise((resolve, reject) => {
            var csvLink = body.csvLink;
            if (csvLink) {
                const linkEnding = csvLink.substr(csvLink.lastIndexOf('/') + 1);
                if (linkEnding.substr(0, 4) === 'edit') {
                    csvLink = csvLink.substr(0, csvLink.lastIndexOf(linkEnding) - 1);
                    csvLink += "/export?format=csv";
                }
            }
            var downloadCsv = request(csvLink);
            downloadCsv.on('response', function (res) {
                var stream = res.pipe(fs.createWriteStream('./' + body.name + '.' + res.headers['content-type'].split('/')[1]));
                stream.on('finish', function () {
                    var filePath = process.env.PWD + '/' + body.name + '.csv';
                    var config = {
                        header: true
                    }
                    var parsed = Baby.parseFiles(filePath, config);
                    csvParsed = true;
                    resolve(parsed.data);
                })
            })
        })
    }

    this.parseCsv(req.body)
        .then((parsedRes) => {
            var classGroup = new ClassGroups({ 
                name: req.body.name,
                nrMinimPrezente: req.body.nrMinimPrezente,
                proiectObligatoriu: req.body.proiectObligatoriu,
                nrTeme: req.body.nrTeme,
                nrSaptamani: req.body.nrSaptamani,
                groupMembers: parsedRes
            });            
            classGroup.save(function(err, group) {
                if(err) {
                    res.send(err);
                }
                res.json(group);
            }); 
        })
};


exports.getGroups = function(req, res) {
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