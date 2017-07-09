'use strict';

var express = require('express');
var controller = require('./student.controller');

var router = express.Router();

router.get('/', controller.getStudents);
// router.post('/', controller.createStudent);
router.put('/:student_id', controller.editStudent);
// router.delete('/:student_id', controller.deleteStudent);

module.exports = router;
