'use strict';

module.exports = function (app) {
    // Insert routes below
    app.use('/api/groups', require('./api/classGroup'));
    app.use('/api/groups/:group_id/students', require('./api/student'));
};
