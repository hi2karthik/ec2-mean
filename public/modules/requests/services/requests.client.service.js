'use strict';

angular.module('requests').factory('Regions', ['$resource',
	function($resource) {
		return $resource('regions/', {}, {});
	}
]);


angular.module('requests').factory('KeyPairs', ['$resource',
    function($resource) {
        return $resource('keypairs/', {}, {});
    }
]);

angular.module('requests').factory('SecurityGroups', ['$resource',
    function($resource) {
        return $resource('securitygroups/', {}, {});
    }
]);

angular.module('requests').factory('Images', ['$resource',
    function($resource) {
        return $resource('images/', {}, {});
    }
]);

angular.module('requests').factory('Requests', ['$resource',
    function($resource) {
        return $resource('requests/', {}, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
