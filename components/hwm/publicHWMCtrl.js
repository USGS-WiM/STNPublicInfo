(function () {
    'use strict';
    var STNControllers = angular.module('STNControllers');
    STNControllers.controller('publicHWMCtrl', ['$scope', '$rootScope', '$http', '$filter', 'thisSite', 'sitePeaks', 'thisHWM', 'hDatumList', 'hwmFiles', 'eventList', 'hTypeList', 'hCollectMethodList', 'hQualityList', 'vCollectMethodList', 'vDatumList', 'markerList', 'agencyList', 'SERVER_URL', 'MEMBER', 'SOURCE',
    function ($scope, $rootScope, $http, $filter, thisSite, sitePeaks, thisHWM, hDatumList, hwmFiles, eventList, hTypeList, hCollectMethodList, hQualityList, vCollectMethodList, vDatumList, markerList, agencyList, SERVER_URL, MEMBER, SOURCE) {
        $scope.serverURL = SERVER_URL;
        $scope.NotFound = false;
        if (thisSite === undefined || thisHWM === undefined) {
            $scope.NotFound = true;
        } else {
            $scope.aSite = thisSite;
            $scope.aSite.HorizontalDatum = thisSite.hdatum_id !== undefined ? hDatumList.filter(function (hd) { return hd.datum_id == thisSite.hdatum_id; })[0].datum_name : "";
            $scope.aSite.HorizontalCollectMethod = thisSite.hcollect_method_id !== undefined && thisSite.hcollect_method_id > 0 ? hCollectMethodList.filter(function (hm) { return hm.hcollect_method_id == thisSite.hcollect_method_id; })[0].hcollect_method : "";
            $scope.peaks = sitePeaks;

            $scope.aHWM = thisHWM;
            if ($scope.aHWM.flag_member_id !== undefined && $scope.aHWM.flag_member_id > 0) {
                $http.defaults.headers.common.Accept = 'application/json';
                MEMBER.getMemberName({ id: $scope.aHWM.flag_member_id }).$promise.then(function (response) {
                    $scope.aHWM.flagMember = response.list;
                });
            }
            if ($scope.aHWM.survey_member_id !== undefined && $scope.aHWM.survey_member_id > 0) {
                $http.defaults.headers.common.Accept = 'application/json';
                MEMBER.getMemberName({ id: $scope.aHWM.survey_member_id }).$promise.then(function (response) {
                    $scope.aHWM.surveyMember = response.list;
                });
            }
            
            $scope.aHWM.eventName = eventList.filter(function (e) { return e.event_id == $scope.aHWM.event_id; })[0].event_name;
            $scope.aHWM.hwmType = hTypeList.filter(function (ht) { return ht.hwm_type_id == thisHWM.hwm_type_id; })[0].hwm_type;
            $scope.aHWM.hwmQuality = thisHWM.hwm_quality_id !== undefined && thisHWM.hwm_quality_id > 0 ? hQualityList.filter(function (hq) { return hq.hwm_quality_id == thisHWM.hwm_quality_id; })[0].hwm_quality : "";
            $scope.aHWM.vCollectMethod = thisHWM.vcollect_method_id !== undefined && thisHWM.vcollect_method_id > 0 ? vCollectMethodList.filter(function (vc) { return vc.vcollect_method_id == thisHWM.vcollect_method_id; })[0].vcollect_method : "";
            $scope.aHWM.vDatum = thisHWM.vdatum_id !== undefined && thisHWM.vdatum_id > 0 ? vDatumList.filter(function (vd) { return vd.datum_id == thisHWM.vdatum_id; })[0].datum_name : "";
            $scope.aHWM.hDatum = thisHWM.hdatum_id !== undefined && thisHWM.hdatum_id > 0 ? hDatumList.filter(function (hd) { return hd.datum_id == thisHWM.hdatum_id; })[0].datum_name : "";
            $scope.aHWM.markerName = thisHWM.marker_id !== undefined && thisHWM.marker_id > 0 ? markerList.filter(function (m) { return m.marker_id == thisHWM.marker_id; })[0].marker1 : "";
            $scope.aHWM.hCollectMethod = thisHWM.hcollect_method_id !== undefined && thisHWM.hcollect_method_id > 0 ? hCollectMethodList.filter(function (hcm) { return hcm.hcollect_method_id == thisHWM.hcollect_method_id; })[0].hcollect_method : "";
            //No collection team name anymore for flag or survey..
            //need creds to get member names -- maybe need separate endpoint to return string of member name without requiring auth
            
            $scope.HWMFiles = hwmFiles;
            $scope.dataFiles = [];
            $scope.imageFiles = [];
            angular.forEach($scope.HWMFiles, function (hf) {
                if (hf.filetype_id == 1) {
                    SOURCE.query({id: hf.source_id}).$promise.then(function (response){
                        hf.source = response;
                        hf.source.sourceAgency = agencyList.filter(function (a) { return a.agency_id == response.agency_id; })[0].agency_name;
                    })
                    $scope.imageFiles.push(hf);
                }
            });
        };//end else (there's a site and hwm
    }]);
})();