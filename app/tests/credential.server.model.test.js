'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Credential = mongoose.model('Credential');

/**
 * Globals
 */
var credential;

/**
 * Unit tests
 */
describe('Credential Model Unit Tests:', function() {

	it('should begin with no credentials', function(done){
		Credential.find({}, function(err, credentials) {
			credentials.should.have.length(0);
			done();
		});
	});

	it('saves new record', function(done) {
		credential = new Credential({
			name: 'Credential1',
			accesskey: 'TestAccessKey1',
			secretkey: 'TestSecretKey1'
		});
		credential.save(function credentialSaveHandler(err){
			should.not.exist(err);
			done();
		});
	});

	it('throws validation error when name is empty', function(done) {
		credential = new Credential({
			accesskey: 'TestAccessKey1',
			secretkey: 'TestSecretKey1'
		});
		credential.save(function credentialSaveHandler(err){
			should.exist(err);
			done();
		});
	});

	it('throws validation error when access key id is empty', function(done) {
		credential = new Credential({
			name: 'Credential1',
			secretkey: 'TestSecretKey1'
		});
		credential.save(function credentialSaveHandler(err){
			should.exist(err);
			done();
		});
	});

	it('throws validation error when secret key is empty', function(done) {
		credential = new Credential({
			name: 'Credential1',
			accesskey: 'TestAccessKey1'
		});
		credential.save(function credentialSaveHandler(err){
			should.exist(err);
			done();
		});
	});

	afterEach(function(done) {
		Credential.remove().exec();
		done();
	});
});
