'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	url = require('url'),
	FacebookStrategy = require('passport-facebook').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');

module.exports = function() {
	// Use facebook strategy
	passport.use(new FacebookStrategy({
			clientID: config.facebook.clientID,
			clientSecret: config.facebook.clientSecret,
			callbackURL: config.facebook.callbackURL,
            profileFields: ['id', 'name', 'displayName', 'emails', 'photos'],
			passReqToCallback: true
		},

		function(req, accessToken, refreshToken, profile, done) {
			// Set the provider data and include tokens
			var providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

            function generateUsername(profile) {
                var username = '';

                if (profile.emails) {
                    username = profile.emails[0].value.split('@')[0];
                } else if (profile.name) {
                    username = profile.name.givenName[0] + profile.name.familyName;
                }

                return username.toLowerCase() || undefined;
            }
			// Create the user OAuth profile
			var providerUserProfile = {
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				displayName: profile.displayName,
                email: profile.emails ? profile.emails[0].value : undefined,
                username: profile.username || generateUsername(profile),
				provider: 'facebook',
				providerIdentifierField: 'id',
				providerData: providerData
			};

			// Save the user OAuth profile
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};
