'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    errorHandler = require('./errors.server.controller'),
    AWS = require('aws-sdk'),
    fs = require('fs');

/**
 * Create a Keypair
 */
exports.create = function(req, res) {
    var keypairinfo = req.body;

    if(!keypairinfo.region || !keypairinfo.region.region || !keypairinfo.region.fullname || !keypairinfo.name || !keypairinfo.filepath) {
        return res.status(400).send({
            message: 'Incorrect information to create keypair'
        });
    }

    AWS.config.update({region: keypairinfo.region.region});
    var ec2 = new AWS.EC2();
    var params = {
        KeyName: keypairinfo.name
    };

    var fileoptions = {
        encoding: 'utf8',
        mode: 0o400
    };

    ec2.createKeyPair(params, function(err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if(data.KeyMaterial) {
                fs.writeFileSync(keypairinfo.filepath + '/' + keypairinfo.name + '.pem', data.KeyMaterial, fileoptions, function(err){
                    if(err) {
                        console.error(err.stacktrace);
                        return res.status(400).send({
                            message: 'Unable to save key'
                        });
                    }
                });
                res.status(201).json(data);
            }
            else {
                return res.status(400).send({
                    message: 'AWS response is incorrect'
                });
            }
        }
    });
};

/**
 * Show the current Keypair
 */
exports.read = function(req, res) {

};

/**
 * Update a Keypair
 */
exports.update = function(req, res) {

};

/**
 * Delete an Keypair
 */
exports.delete = function(req, res) {

};

/**
 * List of Keypairs
 */
exports.list = function(req, res) {
    if(req.query.region) {
        AWS.config.update({region: req.query.region});
        var ec2 = new AWS.EC2();
        ec2.describeKeyPairs({}, function(err, data) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            else  {
                res.status(200).json(data.KeyPairs);
            }
        });
    }
    else {
        return res.status(400).send({
            message: 'Request does not contain region'
        });
    }
};
