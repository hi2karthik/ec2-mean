'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash');


var awsregions = [
    {
        region: 'eu-west-1',
        fullname: 'EU (Ireland)'
    },
    {
        region: 'ap-southeast-1',
        fullname: 'Asia Pacific (Singapore)'
    },
    {
        region: 'ap-southeast-2',
        fullname: 'Asia Pacific (Sydney)'
    },
    {
        region: 'eu-central-1',
        fullname: 'EU (Frankfurt)'
    },
    {
        region: 'ap-northeast-2',
        fullname: 'Asia Pacific (Seoul)'
    },
    {
        region: 'ap-northeast-1',
        fullname: 'Asia Pacific (Tokyo)'
    },
    {
        region: 'us-east-1',
        fullname: 'US East (N. Virginia)'
    },
    {
        region: 'sa-east-1',
        fullname: 'South America (Sao Paulo)'
    },
    {
        region: 'us-west-1',
        fullname: 'US West (N. California)'
    },
    {
        region: 'us-west-2',
        fullname: 'US West (Oregon)'
    }
];
/**
 * List of Regions
 */
exports.list = function(req, res) {
    res.json(awsregions);
};
