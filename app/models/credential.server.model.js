'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	User = require('./user.server.model');

/**
 * Credential Schema
 */
var CredentialSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: 'name cannot be blank'
	},
	accesskey: {
		type: String,
		trim: true,
		required: 'access key cannot be blank'
	},
	secretkey: {
		type: String,
		trim: true,
		required: 'secret key cannot be blank'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Credential', CredentialSchema);
