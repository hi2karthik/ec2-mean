'use strict';

module.exports = function(app) {
    var requests = require('../../app/controllers/requests.server.controller');

    app.route('/requests')
        .get(requests.list)
        .post(requests.create)
        .put(requests.update);
};
