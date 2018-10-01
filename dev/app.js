(function () {
    "use strict";
    var app = angular.module('app',
        ['ngResource', 'ui.router', 'ngCookies', 'ui.bootstrap', 'STNResource', 'leaflet-directive', 'STNControllers']);
    app.constant('SERVER_URL', 'https://stn.wim.usgs.gov/STNServices');

    app.run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.stateIsLoading = { showLoading: true };

        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, error) {
            $rootScope.stateIsLoading.showLoading = false;
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            $rootScope.stateIsLoading.showLoading = false;
            event.preventDefault();
            $state.get('error').error = { code: error.status, description: error.statusText };
            return $state.go('error');
            //alert("Error occurred: Status" + error.status + ", " + error.statusText + ". The following request was unsuccessful: " + error.config.url + " Please refresh and try again.");
        });

    }]);

    //app.config(function that defines the config code. 
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            //if no active state, display state associated with this fragment identifier
    //        $urlRouterProvider.otherwise("/");
            //$locationProvider.html5Mode({ enabled: true, requireBase: true }).hashPrefix('!');
            $stateProvider
                .state('error', {
                    url: 'error',
                    resolve: {
                        errorObj: [function () {
                            return this.self.error;
                        }]
                    },
                    template: '<div class="topPad"><h2>Error retrieving Public Information page.</h2><p>Error: {{errorMessage.code}}. Description: {{errorMessage.description}}</p>'+
                                  '<p>Please try again from the map or contact .... for assistance.</p></div>',
                    controller: ['$scope','errorObj', function ($scope,errorObj){ $scope.errorMessage = errorObj;}]                    
                })
                .state("HWM", {
                    url: "/HWMPage?Site:siteId&HWM:hwmId",
                    params: { Site: null, HWM: null },
                    templateUrl: "components/hwm/hwmInfoPage.html",
                    controller: "publicHWMCtrl",
                    resolve: {                        
                        s: 'SITE',
                        thisSite: function (s, $stateParams) {
                            if ($stateParams.Site > 0) {
                                return s.query({ id: $stateParams.Site }).$promise;
                            }
                        },
                        sitePeaks: function (s, $stateParams) {
                            if ($stateParams.Site > 0) {
                                return s.getSitePeaks({ id: $stateParams.Site }).$promise;
                            }
                        },
                        hDatum: 'HORIZONTAL_DATUM',
                        hDatumList: function (hDatum) {
                            return hDatum.getAll().$promise;
                        },
                        h: 'HWM',
                        thisHWM: function (h, $stateParams) {
                            if ($stateParams.HWM > 0) {
                                return h.query({ id: $stateParams.HWM }).$promise;
                            }
                        },
                        hwmFiles: function (h, $stateParams) {
                            if ($stateParams.HWM > 0) {
                                return h.getHWMFiles({ id: $stateParams.HWM }).$promise;
                            }
                        },
                        e: 'EVENT',
                        eventList: function (e) {
                            return e.getAll().$promise;
                        },
                        hType: 'HWM_TYPE',
                        hTypeList: function (hType) {
                            return hType.getAll().$promise;
                        },
                        hCMethod: 'HORIZONTAL_COLL_METHODS',
                        hCollectMethodList: function (hCMethod) {
                            return hCMethod.getAll().$promise;
                        },
                        hQuality: 'HWM_QUALITY',
                        hQualityList: function (hQuality) {
                            return hQuality.getAll().$promise;
                        },
                        vCMethod: 'VERTICAL_COLL_METHOD',
                        vCollectMethodList: function (vCMethod) {
                            return vCMethod.getAll().$promise;
                        },
                        vDatum: 'VERTICAL_DATUM',
                        vDatumList: function (vDatum) {
                            return vDatum.getAll().$promise;
                        },
                        mark: 'MARKER',
                        markerList: function (mark) {
                            return mark.getAll().$promise;
                        },
                        a: 'AGENCY',
                        agencyList: function (a) {
                            return a.getAll().$promise;
                        }
                    }
                })
                .state("Sensor", {
                    url: "/SensorPage?Site:siteId&Sensor:sensorId",
                    params: { Site: null, Sensor: null },
                    templateUrl: "components/sensor/sensorInfoPage.html",
                    controller: "publicSensorCtrl",
                    resolve: {
                        s: 'SITE',
                        thisSite: function (s, $stateParams) {
                            if ($stateParams.Site > 0) {
                                return s.query({ id: $stateParams.Site }).$promise;
                            }
                        },
                        sitePeaks: function (s, $stateParams) {
                            if ($stateParams.Site > 0) {
                                return s.getSitePeaks({ id: $stateParams.Site }).$promise;
                            }
                        },
                        siteOPs: function (s, $stateParams){
                            if ($stateParams.Site > 0) {
                                return s.getSiteOPs({ id: $stateParams.Site }).$promise;
                            }
                        },
                        hDatum: 'HORIZONTAL_DATUM',
                        hDatumList: function (hDatum) {
                            return hDatum.getAll().$promise;
                        },

                        hCMethod: 'HORIZONTAL_COLL_METHODS',
                        hCollectMethodList: function (hCMethod) {
                            return hCMethod.getAll().$promise;
                        },
                        sen: 'INSTRUMENT',
                        thisSensor: function (sen, $stateParams) {
                            if ($stateParams.Sensor > 0) {
                                return sen.getFullInstrument({ id: $stateParams.Sensor }).$promise;
                            }
                        },
                        sensorFiles: function (sen, $stateParams) {
                            if ($stateParams.Sensor > 0) {
                                return sen.getInstrumentFiles({ id: $stateParams.Sensor }).$promise;
                            }
                        },
                        e: 'EVENT',
                        eventList: function (e) {
                            return e.getAll().$promise;
                        },
                        sensTy: 'SENSOR_TYPE',
                        sensorTypeList: function (sensTy) {
                            return sensTy.getAll().$promise;
                        },
                        sensBr: 'SENSOR_BRAND',
                        sensorBrandList: function (sensBr) {
                            return sensBr.getAll().$promise;
                        },
                        hT: 'HOUSING_TYPE',
                        housingTypeList: function (hT) {
                            return hT.getAll().$promise;
                        },
                        vDatum: 'VERTICAL_DATUM',
                        vDatumList: function (vDatum) {
                            return vDatum.getAll().$promise;
                        },
                        a: 'AGENCY',
                        agencyList: function (a) {
                            return a.getAll().$promise;
                        }
                    }
                });
        }
    ]);
}());
    //                    
    //                    
    //                    
    //                    ,
    //                    se: 'INSTRUMENT',
    //                    thisSensor: function (se, $stateParams) {
    //                        if ($stateParams.Sensor > 0)
    //                            return se.query({ id: $stateParams.Sensor }).$promise;
    //                    }
    //                }
     //           })

   
       
