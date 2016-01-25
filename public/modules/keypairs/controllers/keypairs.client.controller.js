'use strict';

angular.module('keypairs').controller('KeypairsController', ['$scope', '$stateParams', '$location', 'Regions', 'KeyPairs',
	function($scope, $stateParams, $location, Regions, KeyPairs) {

        function keypairErrorHandler(errorResponse) {
            $scope.error = errorResponse.data.message;
        }

		$scope.initRequests = function() {
            $scope.regions = Regions.query();
		};

        $scope.createkeypair = function() {
            var keypair = new KeyPairs({
                region: this.selectedregion,
                name: this.name,
                filepath: this.selectedfilepath
            });

            keypair.$save(
                function keypairsaveHandler(){
                $location.path('/#!/');
                $scope.selectedregion = '';
                $scope.name = '';
                $scope.selectedfilepath = '';
            },
                keypairErrorHandler);
        };

	}
]);
