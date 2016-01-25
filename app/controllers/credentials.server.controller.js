'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Credential = mongoose.model('Credential'),
    _ = require('lodash');

/**
 * Create a Credential
 */
exports.create = function(req, res, next) {
    var credential = new Credential(req.body);

    var user = req.user;

    if(user) {
        credential.user = user.id;
    } else {
        return res.status(400).send({
            message: 'Unable to find user of the request'
        });
    }

    credential.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            req.newlyCreatedCredential = credential;
            res.status(201).json(credential);
            next();
        }
    });
};

/**
 * Show the current Credential
 */
exports.read = function(req, res) {
    res.json(req.credential);
};

/**
 * Update a Credential
 */
exports.update = function(req, res) {
    var credential = req.credential;

    credential = _.extend(credential, req.body);

    credential.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(credential);
        }
    });
};

/**
 * Delete an Credential
 */
exports.delete = function(req, res, next) {
    var credential = req.credential;

    credential.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(credential);
            req.deletedCredential = credential;
            next();
        }
    });
};

/**
 * List of Credentials
 */
exports.list = function(req, res) {
    Credential.find().exec(function(err, credentials) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(credentials);
        }
    });
};


/**
 * Address middleware
 */
exports.credentialByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Credential is invalid'
        });
    }

    Credential.findById(id).exec(function(err, credential) {
        if (err) return next(err);
        if (!credential) {
            return res.status(404).send({
                message: 'Credential not found'
            });
        }
        req.credential = credential;
        next();
    });
};
