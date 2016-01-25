'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var errorHandler = require('../errors.server.controller.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');

/**
 * Update user with the newly created credential
 */
exports.addCredentialToUser = function(req, res) {
    var user = req.user;
    var credential = req.newlyCreatedCredential;
    if(user) {
        if(credential) {
            user.credentials.push(credential.id);
            user.save(function(err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    // Delete the newly created credential from the request, once it is updated in the database
                    delete req.newlyCreatedCredential;
                }
            });
        } else {
            res.status(400).send({
                message: 'Unable to determine the credential that was created, to update the user'
            });
        }
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

/**
 * Update user by removing the deleted address from the user
 */
exports.removeCredentialFromUser = function(req, res) {
    var user = req.user;
    var credential = req.deletedCredential;
    if(user) {
        if(credential) {
            var indexOfCredential = user.credentials.indexOf(credential.id);
            if (indexOfCredential > -1) {
                user.credentials.splice(indexOfCredential, 1);
                user.save(function(err) {
                    if (err) {
                        return res.status(400).send({
                            message: errorHandler.getErrorMessage(err)
                        });
                    } else {
                        // Delete the deleted credential from the request, once it is updated in the database
                        delete req.deletedCredential;
                    }
                });
            }
        } else {
            res.status(400).send({
                message: 'Unable to determine the credential that was deleted, to update the user'
            });
        }

    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};
