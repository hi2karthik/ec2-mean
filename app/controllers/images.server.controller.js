'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    errorHandler = require('./errors.server.controller'),
    AWS = require('aws-sdk');

/**
 * Create a Image
 */
exports.create = function(req, res) {

};

/**
 * Show the current Image
 */
exports.read = function(req, res) {

};

/**
 * Update a Image
 */
exports.update = function(req, res) {

};

/**
 * Delete an Image
 */
exports.delete = function(req, res) {

};

/**
 * List of Images
 */
exports.list = function(req, res) {
    if(req.query.region) {
        AWS.config.update({region: req.query.region});
        var ec2 = new AWS.EC2();
        var params = {};

        var filters = [];

        if(req.query.arch) {
            filters.push({
                Name: 'architecture',
                Values: req.query.arch.split(',')
            });
        }

        if(req.query.plat && req.query.plat === 'true') {
            filters.push({
                Name: 'platform',
                Values: [
                    'windows'
                ]
            });
        }

        if(req.query.virt) {
            filters.push({
                Name: 'virtualization-type',
                Values: req.query.virt.split(',')
            });
        }

        filters.push({
            Name: 'image-type',
            Values: [
                'machine'
            ]
        });


        params.Filters = filters;

        if(req.query.owner) {
            params.Owners = req.query.owner.split(',');
        }

        ec2.describeImages(params, function(err, data) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
            else  {
                res.status(201).json(data.Images);
            }
        });
    }
    else {
        return res.status(400).send({
            message: 'Request does not contain region'
        });
    }
};
