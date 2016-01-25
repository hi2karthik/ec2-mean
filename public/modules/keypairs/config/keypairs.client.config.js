'use strict';

// Keypairs module config
angular.module('keypairs').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'KeyPairs', 'keypairs', 'dropdown', '/keypairs(/create)?');
		Menus.addSubMenuItem('topbar', 'keypairs', 'New KeyPair', 'keypairs/create');
	}
]);
