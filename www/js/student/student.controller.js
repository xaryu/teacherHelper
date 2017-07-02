'use strict';

angular.module('starter.controllers').controller('StudentCtrl', function($scope, $stateParams) {
    console.log('student.ctrl');
    $scope.student = $stateParams.student;
    debugger;
})