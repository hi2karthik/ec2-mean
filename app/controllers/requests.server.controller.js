'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    errorHandler = require('./errors.server.controller'),
    AWS = require('aws-sdk');

/**
 * Create a Request
 */
exports.create = function(req, res) {

    var requestinfo = req.body;

    if(!requestinfo.region || !requestinfo.image || !requestinfo.instance || !requestinfo.securitygroup || !requestinfo.keypair) {
        return res.status(400).send({
            message: 'Incorrect information to create instance'
        });
    }

    AWS.config.update({region: requestinfo.region});
    var ec2 = new AWS.EC2();

    var params = {
        ImageId: requestinfo.image,
        InstanceType: requestinfo.instance,
        SecurityGroupIds: [
            requestinfo.securitygroup
        ],
        KeyName: requestinfo.keypair,
        MinCount: 1,
        MaxCount: 1
    };

    console.log(params);

    ec2.runInstances(params, function(err, data) {
        if (err) {
            return res.status(400).send({
                message: err.message ? err.message : err.code ? err.code : 'something bad happened'
            });
        }
        else {
            res.status(201).json(data);
        }
    });
};

/**
 * Show the current Request
 */
exports.read = function(req, res) {

};

/**
 * Update a Request
 */
exports.update = function(req, res) {
    var updateinfo = req.body;

    if(updateinfo.region) {
        AWS.config.update({region: updateinfo.region});
        var ec2 = new AWS.EC2();

        var params = {
            InstanceIds: [
                updateinfo.id
            ]
        };

        if (updateinfo.action === 'stop') {
            ec2.stopInstances(params, function(err, data) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
                else  {
                    res.status(201).json(data);
                }
            });
        }
        else if (updateinfo.action === 'terminate') {
            ec2.terminateInstances(params, function(err, data) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
                else  {
                    res.status(201).json(data);
                }
            });
        }
    }
    else {
        return res.status(400).send({
            message: 'Request does not contain region'
        });
    }
};

/**
 * Delete an Request
 */
exports.delete = function(req, res) {

};

/**
 * List of Requests
 */
exports.list = function(req, res) {
    if(req.query.region) {
        AWS.config.update({region: req.query.region});
        var ec2 = new AWS.EC2();
        ec2.describeInstances({}, function(err, data) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            else  {
                res.status(200).json(data.Reservations);
            }
        });
    }
    else {
        return res.status(400).send({
            message: 'Request does not contain region'
        });
    }
};
