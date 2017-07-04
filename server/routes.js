'use strict';

module.exports = function (app) {
    // Insert routes below
    app.use('/api/groups', require('./api/classGroup'));

};
