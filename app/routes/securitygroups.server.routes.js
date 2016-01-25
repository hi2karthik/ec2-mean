'use strict';

module.exports = function(app) {
    var securitygroups = require('../../app/controllers/securitygroups.server.controller');

    app.route('/securitygroups')
        .get(securitygroups.list);
};
