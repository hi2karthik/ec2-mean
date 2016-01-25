'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    errorHandler = require('./errors.server.controller'),
    AWS = require('aws-sdk');

/**
 * Create a Securitygroup
 */
exports.create = function(req, res) {

};

/**
 * Show the current Securitygroup
 */
exports.read = function(req, res) {

};

/**
 * Update a Securitygroup
 */
exports.update = function(req, res) {

};

/**
 * Delete an Securitygroup
 */
exports.delete = function(req, res) {

};

/**
 * List of Securitygroups
 */
exports.list = function(req, res) {
    if(req.query.region) {
        AWS.config.update({region: req.query.region});
        var ec2 = new AWS.EC2();
        ec2.describeSecurityGroups({}, function(err, data) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            else  {
                res.status(201).json(data.SecurityGroups);
            }
        });
    }
    else {
        return res.status(400).send({
            message: 'Request does not contain region'
        });
    }
};
