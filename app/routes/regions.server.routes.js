'use strict';

module.exports = function(app) {
    var regions = require('../../app/controllers/regions.server.controller');

    app.route('/regions')
        .get(regions.list);
};
