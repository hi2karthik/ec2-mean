'use strict';

angular.module('requests').controller('RequestsController', ['$scope', '$stateParams', '$location', 'Regions', 'KeyPairs', 'SecurityGroups', 'Images', 'Requests',
	function($scope, $stateParams, $location, Regions, KeyPairs, SecurityGroups, Images, Requests) {

        function errorHandler(errorResponse) {
            $scope.error = errorResponse.data.message;
        }

        var architectures = [
            {
                name: '32-bit',
                value: 'i386'
            },
            {
                name: '64-bit',
                value: 'x86_64'
            }
        ];

        var virtualizationtypes = [
            {
                name: 'Hardware Virtual Machine',
                value: 'hvm'
            },
            {
                name: 'ParaVirtual',
                value: 'paravirtual'
            }
        ];

        var imageowners = [
            {
                name: 'Amazon',
                value: 'amazon'
            },
            {
                name: 'AWS Market Place',
                value: 'aws-marketplace'
            },
            {
                name: 'Self',
                value: 'self'
            }
        ];

        var instancetypes = [
            {
                name: 't1.micro'
            },
            {
                name: 't2.nano'
            },
            {
                name: 't2.micro'
            },
            {
                name: 't2.small'
            },
            {
                name: 't2.medium'
            },
            {
                name: 't2.large'
            },
            {
                name: 'm1.small'
            },
            {
                name: 'm1.medium'
            },
            {
                name: 'm1.large'
            },
            {
                name: 'm1.xlarge'
            },
            {
                name: 'm2.xlarge'
            },
            {
                name: 'm2.2xlarge'
            },
            {
                name: 'm2.4xlarge'
            },
            {
                name: 'm3.medium'
            },
            {
                name: 'm3.large'
            },
            {
                name: 'm3.xlarge'
            },
            {
                name: 'm3.2xlarge'
            },
            {
                name: 'm4.large'
            },
            {
                name: 'm4.xlarge'
            },
            {
                name: 'm4.2xlarge'
            },
            {
                name: 'm4.4xlarge'
            },
            {
                name: 'm4.10xlarge'
            },
            {
                name: 'cr1.8xlarge'
            },
            {
                name: 'i2.xlarge'
            },
            {
                name: 'i2.2xlarge'
            },
            {
                name: 'i2.4xlarge'
            },
            {
                name: 'i2.8xlarge'
            },
            {
                name: 'hi1.4xlarge'
            },
            {
                name: 'hs1.8xlarge'
            },
            {
                name: 'c1.medium'
            },
            {
                name: 'c1.xlarge'
            },
            {
                name: 'c3.large'
            },
            {
                name: 'c3.xlarge'
            },
            {
                name: 'c3.2xlarge'
            },
            {
                name: 'c3.4xlarge'
            },
            {
                name: 'c3.8xlarge'
            },
            {
                name: 'c4.large'
            },
            {
                name: 'c4.xlarge'
            },
            {
                name: 'c4.2xlarge'
            },
            {
                name: 'c4.4xlarge'
            },
            {
                name: 'c4.8xlarge'
            },
            {
                name: 'cc1.4xlarge'
            },
            {
                name: 'cc2.8xlarge'
            },
            {
                name: 'g2.2xlarge'
            },
            {
                name: 'cg1.4xlarge'
            },
            {
                name: 'r3.large'
            },
            {
                name: 'r3.xlarge'
            },
            {
                name: 'r3.2xlarge'
            },
            {
                name: 'r3.4xlarge'
            },
            {
                name: 'r3.8xlarge'
            },
            {
                name: 'd2.xlarge'
            },
            {
                name: 'd2.2xlarge'
            },
            {
                name: 'd2.4xlarge'
            },
            {
                name: 'd2.8xlarge'
            }
        ];

        function transformselection(selectedvalues) {
            var transformedoutput = '';
            for(var key in selectedvalues) {
                if(selectedvalues[key] === true) {
                    if(transformedoutput.length > 0) {
                        transformedoutput += ',';
                    }
                    transformedoutput += key;
                }
            }
            return transformedoutput;
        }

        $scope.find = function() {
            $scope.instances = [];
            $scope.regions = Regions.query();
        };

        $scope.retrieveInstances = function() {
            $scope.showSpinner = true;
            $scope.instances = Requests.query({
                region: this.selectedregion.region
            }, function requestsQueryHandler(data) {
                    $scope.showSpinner = false;
            }, errorHandler
            );
        };

        $scope.refreshinstances = function() {
            if(this.selectedregion) {
                $scope.showSpinner = true;
                $scope.instances = Requests.query({
                        region: this.selectedregion.region
                    }, function requestsQueryHandler() {
                        $scope.showSpinner = false;
                    }, errorHandler
                );
            }
        };

        $scope.stopinstance = function(instance) {
            $scope.showSpinner = true;
            Requests.update({
                region: this.selectedregion.region,
                id: instance.InstanceId,
                action: 'stop'
            }, function stopHandler() {
                $scope.showSpinner = false;
            });
        };

        $scope.terminateinstance = function(instance) {
            $scope.showSpinner = true;
            Requests.update({
                region: this.selectedregion.region,
                id: instance.InstanceId,
                action: 'terminate'
            }, function terminateHandler() {
                $scope.showSpinner = false;
            });
        };

        $scope.clearupStates = function() {
            $scope.architectures = architectures;
            $scope.virtualizationtypes = virtualizationtypes;
            $scope.imageowners = imageowners;
            $scope.instancetypes = instancetypes;
            $scope.selectedregion = '';
            $scope.selectedarchitecture = {
                values: {
                    'i386' : false,
                    'x86_64': false
                }
            };
            $scope.onlywindows = '';
            $scope.selectedvirtualizationtype = {
                values: {
                    'hvm': false,
                    'paravirtual': false
                }
            };
            $scope.selectedimageowner = {
                values: {
                    'amazon': false,
                    'aws-marketplace': false,
                    'self': false
                }
            };
            $scope.images = '';
            $scope.selectedimage = '';
            $scope.selectedinstancetype = '';
            $scope.selectedsecuritygroup = '';
            $scope.selectedkeypair = '';

        };

        $scope.initRequests = function() {
			$scope.regions = Regions.query();
            $scope.clearupStates();
		};

        $scope.searchimages = function() {
            $scope.showSpinner = true;
            $scope.images = Images.query(
                {
                    region: this.selectedregion.region,
                    arch: transformselection(this.selectedarchitecture.values),
                    plat: this.onlywindows,
                    virt: transformselection(this.selectedvirtualizationtype.values),
                    owner: transformselection(this.selectedimageowner.values)
                }, function queryResultHandler(){
                    $scope.showSpinner = false;
                }
            );
        };

        $scope.cancelimageselect = function() {
            $scope.images = '';
        };

        $scope.selectimage = function(image) {
            $scope.selectedimage = image;
            $scope.retrievesecuritygroups();
        };

        $scope.cancelinstanceselect = function() {
            $scope.selectedimage = '';
        };

        $scope.cancelkeypairselect = function() {
            $scope.selectedinstancetype = '';
            $scope.selectedsecuritygroup = '';
        };

        $scope.cancelconfirmationselect = function() {
            $scope.selectedkeypair = '';
        };

        $scope.retrievesecuritygroups = function() {
            $scope.securitygroups = SecurityGroups.query(
                {
                    region: this.selectedregion.region
                }
            );

        };

        $scope.retrievekeypairs = function() {
            $scope.keypairs = KeyPairs.query(
                {
                    region: this.selectedregion.region
                }
            );
        };

        $scope.selectsecuritygroup = function(securitygroup) {
            $scope.selectedsecuritygroup = securitygroup;
            $scope.retrievekeypairs();
        };

        $scope.selectkeypair = function(keypair) {
            $scope.selectedkeypair = keypair;
        };

        $scope.requestinstance = function() {
            var requestinstanceinfo = new Requests({
                region: this.selectedregion.region,
                image: this.selectedimage.ImageId,
                instance: this.selectedinstancetype.name,
                securitygroup: this.selectedsecuritygroup.GroupId,
                keypair: this.selectedkeypair.KeyName
            });

            requestinstanceinfo.$save(
                function requestinstanceSaveHandler(){
                    $location.path('requests');
                    $scope.clearupStates();
                },
                errorHandler
            );
        };
	}
]);
