(function () {
    'use strict';
    var STNControllers = angular.module('STNControllers');
    STNControllers.controller('publicSensorCtrl', ['$scope', '$http', '$rootScope', '$state', '$filter', 'SERVER_URL', 'thisSite', 'sitePeaks','hDatumList', 'hCollectMethodList', 'thisSensor', 'agencyList', 'sensorFiles', 'eventList', 'sensorTypeList', 'sensorBrandList','housingTypeList', 'vDatumList', 'siteOPs', 'OP_MEASURE', 'MEMBER', 'SOURCE', 'DATA_FILE',
    function ($scope, $http, $rootScope, $state, $filter, SERVER_URL, thisSite, sitePeaks, hDatumList, hCollectMethodList, thisSensor, agencyList, sensorFiles, eventList, sensorTypeList, sensorBrandList, housingTypeList, vDatumList, siteOPs, OP_MEASURE, MEMBER, SOURCE, DATA_FILE) {
        $scope.serverURL = SERVER_URL;
        $scope.NotFound = false;
        if (thisSite === undefined || thisSensor === undefined) {
            $scope.NotFound = true;
        } else {
            $scope.aSite = thisSite;
            $scope.aSite.HorizontalDatum = thisSite.hdatum_id !== undefined ? hDatumList.filter(function (hd) { return hd.datum_id == thisSite.hdatum_id; })[0].datum_name : "";
            $scope.aSite.HorizontalCollectMethod = thisSite.hcollect_method_id !== undefined && thisSite.hcollect_method_id > 0 ? hCollectMethodList.filter(function (hm) { return hm.hcollect_method_id == thisSite.hcollect_method_id; })[0].hcollect_method : "";
            $scope.peaks = sitePeaks;

            $scope.aSensor = thisSensor;            
            $scope.aSensor.eventName = $scope.aSensor.event_id !== undefined && $scope.aSensor.event_id > 0 ? eventList.filter(function (e) { return e.event_id == $scope.aSensor.event_id; })[0].event_name : '';
                       
            //formatting date and time properly for chrome and ff
            var getDateTimeParts = function (d) {
                var theDate;
                var isDate = Object.prototype.toString.call(d) === '[object Date]';
                if (isDate === false) {
                    var y = d.substr(0, 4);
                    var m = d.substr(5, 2) - 1; //subtract 1 for index value (January is 0)
                    var da = d.substr(8, 2);
                    var h = d.substr(11, 2);
                    var mi = d.substr(14, 2);
                    var sec = d.substr(17, 2);
                    theDate = new Date(y, m, da, h, mi, sec);
                } else {
                    //this is already a date, return it back
                    theDate = d;
                }
                return theDate;
            };

            //#region DEPLOYED status information
            $scope.depSenStatus = $scope.aSensor.instrument_status.filter(function (ss) { return ss.status === "Deployed"; })[0];
            $scope.depSenStatus.time_stamp = getDateTimeParts($scope.depSenStatus.time_stamp);//keeps it as utc for display
            if ($scope.depSenStatus.member_id !== undefined && $scope.depSenStatus.member_id > 0) {
                $http.defaults.headers.common.Accept = 'application/json';
                MEMBER.getMemberName({ id: $scope.depSenStatus.member_id }).$promise.then(function (response) {
                    $scope.depSenStatus.deployer = response.list;
                });
            };            
            $scope.depTapeDownTable = []; //should I show tapedowns?
            //see if the instrument status has a tapedown
            $http.defaults.headers.common.Accept = 'application/json';
            OP_MEASURE.getInstStatOPMeasures({ instrumentStatusId: $scope.depSenStatus.instrument_status_id }).$promise.then(function (response) {
                for (var r = 0; r < response.length; r++) {
                    var sensMeasures = response[r];
                    var whichOP = siteOPs.filter(function (op) { return op.objective_point_id == response[r].objective_point_id; })[0];
                    if (whichOP !== undefined) {
                        sensMeasures.elevation = whichOP.elev_ft !== undefined ? whichOP.elev_ft : '';
                        sensMeasures.OPVdatum = vDatumList.filter(function (vd) { return vd.datum_id == whichOP.vdatum_id; })[0].datum_abbreviation;
                        sensMeasures.op_name = whichOP.name;
                        $scope.depTapeDownTable.push(sensMeasures);
                    }
                }
            });
            //#endregion

            //#region RETRIEVED status information
            $scope.retSenStatus = $scope.aSensor.instrument_status.filter(function (ss) { return ss.status === "Retrieved"; })[0];
            if ($scope.retSenStatus === undefined) $scope.retSenStatus = $scope.aSensor.instrument_status.filter(function (ss) { return ss.status === "Lost"; })[0];
            if ($scope.retSenStatus !== undefined) {
                $scope.retSenStatus.time_stamp = getDateTimeParts($scope.retSenStatus.time_stamp);//keeps it as utc for display
                if ($scope.retSenStatus.member_id !== undefined && $scope.retSenStatus.member_id > 0) {
                    $http.defaults.headers.common.Accept = 'application/json';
                    MEMBER.getMemberName({ id: $scope.retSenStatus.member_id }).$promise.then(function (response) {
                        $scope.retSenStatus.retriever = response.list;
                    });
                };
                $scope.retTapeDownTable = []; //should I show tapedowns?
                //see if the instrument status has a tapedown
                $http.defaults.headers.common.Accept = 'application/json';
                OP_MEASURE.getInstStatOPMeasures({ instrumentStatusId: $scope.retSenStatus.instrument_status_id }).$promise.then(function (response) {
                    for (var r = 0; r < response.length; r++) {
                        var retsensMeasures = response[r];
                        var retwhichOP = siteOPs.filter(function (op) { return op.objective_point_id == response[r].objective_point_id; })[0];
                        if (retwhichOP !== undefined) {
                            retsensMeasures.elevation = retwhichOP.elev_ft;
                            retsensMeasures.OPVdatum = vDatumList.filter(function (vd) { return vd.datum_id == retwhichOP.vdatum_id; })[0].datum_abbreviation;
                            retsensMeasures.op_name = retwhichOP.name;
                            $scope.retTapeDownTable.push(retsensMeasures);
                        }
                    }
                });
            }
            //#endregion

            //Sesnor Files
            $scope.SensorFiles = sensorFiles;
            $scope.dataFiles = [];
            $scope.imageFiles = [];
            angular.forEach($scope.SensorFiles, function (hf) {
                if (hf.filetype_id == 1) {
                    SOURCE.query({ id: hf.source_id }).$promise.then(function (response) {
                        hf.source = response;
                        hf.source.sourceAgency = agencyList.filter(function (a) { return a.agency_id == response.agency_id; })[0].agency_name;
                    })
                    $scope.imageFiles.push(hf);
                }
                if (hf.filetype_id == 2) {
                    $scope.dataFiles.push(hf);
                }
            });
        }//end else (site and sensor are not undefined)
    }]);
})();