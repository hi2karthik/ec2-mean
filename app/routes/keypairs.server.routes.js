'use strict';

module.exports = function(app) {
    var keypairs = require('../../app/controllers/keypairs.server.controller');

    app.route('/keypairs')
        .get(keypairs.list)
        .post(keypairs.create);
};
