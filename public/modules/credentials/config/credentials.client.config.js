'use strict';

// Credentials module config
angular.module('credentials').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'Credentials', 'credentials', 'dropdown', '/credentials(/create)?');
		Menus.addSubMenuItem('topbar', 'credentials', 'List Credentials', 'credentials');
		Menus.addSubMenuItem('topbar', 'credentials', 'New Credential', 'credentials/create');
	}
]);
