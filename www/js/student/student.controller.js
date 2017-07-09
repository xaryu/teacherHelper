'use strict';

angular.module('starter.controllers').controller('StudentCtrl', function($scope, $stateParams) {
    $scope.student = $stateParams.student;

    $scope.increment = function(context) {
        $scope.student.nrAbsente+=1;
    }

    $scope.decrement = function() {
        if($scope.student.nrAbsente > 0) {   
            $scope.student.nrAbsente-=1;  
        }
    }
})