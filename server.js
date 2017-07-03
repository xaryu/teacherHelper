// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var db = mongoose.connect('mongodb://localhost/teacherHelper');

var ClassGroups = require('./models/classGroups.model');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
// more routes for our API will happen here
router.route('/group')
    .post(function(req, res) {
        var classGroup = new ClassGroups();
        classGroup.name = req.body.name;

        classGroup.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Classgroup created!' });
        });
    });

router.route('/groups')
    .get(function(req, res) {
        ClassGroups.find(function(err, groups) {
            if(err) {
                res.send(err);
            }
            res.json(groups);
        });
    });

router.route('/groups/:group_id')
    .get(function(req, res) {
        ClassGroups.findById(req.params.group_id, function(err, group) {
            if(err) {
                res.send(err);
            }
            res.json(group);
        });
    });

router.route('/groups/:group_id')
    .put(function(req, res) {
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
    });

router.route('/groups/:group_id')
    .delete(function(req, res) {
        ClassGroups.remove({
            _id: req.params.group_id
        }, function(err, group) {
            if(err) {
                res.send(err)
            }
            res.json({message: 'Successfully deleted'});
        });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);