'use strict';

//Setting up route
angular.module('credentials').config(['$stateProvider',
	function($stateProvider) {
		// Credentials state routing
		$stateProvider.
		state('credentials', {
			url: '/credentials',
			templateUrl: 'modules/credentials/views/credentials.client.view.html'
		}).
		state('create-credential', {
			url: '/credentials/create',
			templateUrl: 'modules/credentials/views/create-credential.client.view.html'
		}).
		state('edit-address', {
			url: '/credentials/:credentialId/edit',
			templateUrl: 'modules/credentials/views/edit-credential.client.view.html'
		});
	}
]);
