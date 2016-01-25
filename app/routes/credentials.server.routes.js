'use strict';

module.exports = function(app) {
    var credentials = require('../../app/controllers/credentials.server.controller');
    var users = require('../../app/controllers/users.server.controller');

    app.route('/credentials')
        .get(credentials.list)
        .post(users.requiresLogin, credentials.create, users.addCredentialToUser);


    app.route('/credentials/:credentialId')
        .get(credentials.read)
        .put(users.requiresLogin, credentials.update)
        .delete(users.requiresLogin, credentials.delete, users.removeCredentialFromUser);


    app.param('credentialId', credentials.credentialByID);
};
