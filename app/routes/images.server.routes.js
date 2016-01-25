'use strict';

module.exports = function(app) {
    var images = require('../../app/controllers/images.server.controller');

    app.route('/images')
        .get(images.list);
};
