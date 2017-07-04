'use strict';

var express = require('express');
var controller = require('./classGroup.controller');

var router = express.Router();

router.get('/', controller.getGroups);
router.post('/', controller.createGroup);
router.get('/:group_id', controller.getGroupById);
router.put('/:group_id', controller.changeGroupById);
router.delete('/:group_id', controller.deleteGroup);

module.exports = router;
