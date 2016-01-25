'use strict';

// Requests module config
angular.module('requests').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('topbar', 'Requests', 'requests', 'dropdown', '/requests(/create)?');
        Menus.addSubMenuItem('topbar', 'requests', 'List Instances', 'requests');
		Menus.addSubMenuItem('topbar', 'requests', 'New Request', 'requests/create');
	}
]);
