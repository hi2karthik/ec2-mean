'use strict';

//Setting up route
angular.module('requests').config(['$stateProvider',
	function($stateProvider) {
		// Requests state routing
		$stateProvider.
		state('requests', {
			url: '/requests',
			templateUrl: 'modules/requests/views/requests.client.view.html'
		}).
		state('create-request', {
			url: '/requests/create',
			templateUrl: 'modules/requests/views/create-request.client.view.html'
		});
	}
]);
