'use strict';

angular.module('keypairs').factory('Regions', ['$resource',
	function($resource) {
		return $resource('regions/', {}, {});
	}
]);


angular.module('keypairs').factory('KeyPairs', ['$resource',
	function($resource) {
		return $resource('keypairs/', {}, {});
	}
]);
