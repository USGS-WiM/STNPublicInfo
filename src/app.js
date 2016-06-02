(function () {
    "use strict";
    var app = angular.module('app',
        ['ngResource', 'ui.router', 'ngCookies', 'ui.bootstrap', 'cgBusy', 'angular.filter', 'STNResource', 'leaflet-directive',
            'STNControllers', 'ModalControllers', 'WiM.Services', 'WiM.Event', 'wim_angular', 'angularSpinners']);
    app.constant('SERVER_URL', 'https://stntest.wim.usgs.gov/STNServices2');

    app.run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
           $rootScope.stateIsLoading = { showLoading: true };           
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, error) {
            $rootScope.stateIsLoading.showLoading = false;
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            $rootScope.stateIsLoading.showLoading = false;
            alert("Error occurred: Status" + error.status + ", " + error.statusText + ". The following request was unsuccessful: " + error.config.url + " Please refresh and try again.");
        });

    }]);
    //app.config(function that defines the config code. 'ui.select', 'ngSanitize','$locationProvider', $locationProvider
    app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            //if no active state, display state associated with this fragment identifier
            $urlRouterProvider.otherwise("/");

            $stateProvider
                
                //#region public facing hwm and sensor pages
                .state("HWMInfoPage", {
                    url: "/HWMInfo?Site:siteId&HWM:hwmId",
                    templateUrl: "component/hwm/hwmInformationPage.html",
                    controller: "publicHWMCtrl",
                    resolve: {
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
                //#endregion public facing hwm and sensor pages


        }
    ]);
}());
