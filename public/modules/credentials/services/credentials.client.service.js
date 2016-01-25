'use strict';

angular.module('credentials').factory('Credentials', ['$resource',
	function($resource) {
		return $resource('credentials/:credentialId', { credentialId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
