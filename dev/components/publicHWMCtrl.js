(function () {
    'use strict';

    var STNControllers = angular.module('STNControllers');

    STNControllers.controller('publicHWMCtrl', ['$scope', '$rootScope', '$state', '$filter', 'thisHWM', 'hwmFiles', 'thisSite', 'hDatumList', 'sitePeaks', 'eventList', 'hTypeList', 'hCollectMethodList', 'hQualityList', 'vCollectMethodList', 'vDatumList', 'markerList', 'agencyList',
        function ($scope, $rootScope, $state, $filter, thisHWM, hwmFiles, thisSite, hDatumList, sitePeaks, eventList, hTypeList, hCollectMethodList, hQualityList, vCollectMethodList, vDatumList, markerList, agencyList) {
            $scope.aSite = thisSite;
            $scope.aSite.hDatumName = thisSite.hdatum_id !== undefined ? hDatumList.filter(function (hd) { return hd.datum_id == thisSite.hdatum_id; })[0].datum_name : "";

            $scope.peaks = sitePeaks;

            $scope.aHWM = thisHWM;
            $scope.aHWM.eventName = eventList.filter(function (e) { return e.event_id == $scope.aHWM.event_id; })[0].event_name;
            $scope.aHWM.hwmLabel = thisHWM.hwm_label !== undefined ? thisHWM.hwm_label : "";
            $scope.aHWM.hwmType = hTypeList.filter(function (ht) { return ht.hwm_type_id == thisHWM.hwm_type_id; })[0].hwm_type;
            $scope.aHWM.hwmQuality = thisHWM.hwm_quality_id !== undefined && thisHWM.hwm_quality_id > 0 ? hQualityList.filter(function (hq) { return hq.hwm_quality_id == thisHWM.hwm_quality_id; })[0].hwm_quality : "";
            $scope.aHWM.vCollectMethod = thisHWM.vcollect_method_id !== undefined && thisHWM.vcollect_method_id > 0 ? vCollectMethodList.filter(function (vc) { return vc.vcollect_method_id == thisHWM.vcollect_method_id; })[0].vcollect_method : "";
            $scope.aHWM.vDatum = thisHWM.vdatum_id !== undefined && thisHWM.vdatum_id > 0 ? vDatumList.filter(function (vd) { return vd.datum_id == thisHWM.vdatum_id; })[0].datum_name : "";
            $scope.aHWM.markerName = thisHWM.marker_id !== undefined && thisHWM.marker_id > 0 ? markerList.filter(function (m) { return m.marker_id == thisHWM.marker_id; })[0].marker1 : "";
            $scope.aHWM.hCollectMethod = thisHWM.hcollect_method_id !== undefined && thisHWM.hcollect_method_id > 0 ? hCollectMethodList.filter(function (m) { return m.hcollect_method_id == thisHWM.hcollect_method_id; })[0].hcollect_method : "";
            $scope.aHWM.height_above_gnd = thisHWM.height_above_gnd !== undefined ? thisHWM.height_above_gnd : "---";
            $scope.aHWM.elev_ft = thisHWM.elev_ft !== undefined ? thisHWM.elev_ft : "---";
            //No collection team name anymore for flag or survey..
            //need creds to get member names -- maybe need separate endpoint to return string of member name without requiring auth

            $scope.hwmFileList = hwmFiles;
        }]);

})();