(function () {
    'use strict';
    var STNControllers = angular.module('STNControllers');
    STNControllers.controller('errorCtrl', ['$scope', '$rootScope', '$state', 'errorObj', 
    function ($scope, $rootScope, $state, errorObj) {
        $scope.errorMessage = errorObj;

    }]);
})();