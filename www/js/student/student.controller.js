'use strict';

angular.module('starter.controllers').controller('StudentCtrl', function($scope, $stateParams, GroupsService, $window) {
    $scope.student = $stateParams.student;
    let groupId = $stateParams.groupId;

    $scope.increment = function(context) {
        $scope.student.nrPrezente+=1;
    }

    $scope.decrement = function() {
        if($scope.student.nrPrezente > 0) {   
            $scope.student.nrPrezente-=1;  
        }
    }

    $scope.saveStudent = function(student) {
        GroupsService.editStudent(groupId, student)
            .then(responseData => {
                $window.history.go(-1);
            })
            .catch(err => console.log(err));
    }
})