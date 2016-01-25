'use strict';

angular.module('credentials').controller('CredentialsController', ['$scope', '$stateParams', '$location', 'Credentials',
	function($scope, $stateParams, $location, Credentials) {

        function credentialErrorHandler(errorResponse) {
            $scope.error = errorResponse.data.message;
        }

        $scope.create = function() {

            var credential = new Credentials({
                name: this.name,
                accesskey: this.accesskey,
                secretkey: this.secretkey
            });

            credential.$save(
                function credentialSaveHandler(response) {
                    $location.path('credentials');

                    $scope.name = '';
                    $scope.accesskey = '';
                    $scope.secretkey = '';
                },
                credentialErrorHandler
            );

        };

        // Remove existing Category
        $scope.remove = function(credential) {
            if ( credential ) {
                credential.$remove();

                for (var i in $scope.credentials) {
                    if ($scope.credentials [i] === credential) {
                        $scope.credentials.splice(i, 1);
                    }
                }
            } else {
                $scope.credential.$remove(function() {
                    $location.path('credentials');
                });
            }
        };

        // Update existing Category
        $scope.update = function() {
            var credential = $scope.credential;

            credential.$update(
                function() {
                    $location.path('credentials');
                },
                credentialErrorHandler
            );
        };

		// Find a list of Credentials
		$scope.find = function() {
			$scope.credentials = Credentials.query();
		};

        $scope.findOne = function() {
            $scope.credential = Credentials.get({
                credentialId: $stateParams.credentialId
            });
        };
	}
]);
