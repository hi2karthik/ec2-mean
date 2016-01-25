'use strict';

//Setting up route
angular.module('keypairs').config(['$stateProvider',
	function($stateProvider) {
		// Keypairs state routing
		$stateProvider.
		state('create-keypair', {
			url: '/keypairs/create',
			templateUrl: 'modules/keypairs/views/create-keypair.client.view.html'
		}).
		state('keypairs', {
			url: '/keypairs',
			templateUrl: 'modules/keypairs/views/keypairs.client.view.html'
		});
	}
]);
