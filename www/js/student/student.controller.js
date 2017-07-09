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
        if(typeof(student.notaTest) == 'string') {
            student.notaTest = student.notaTest.replace(/[\s,]+/g, ',').split(',');
        }
        if(typeof(student.notaTeme) == 'string') {
            student.notaTeme = student.notaTeme.replace(/[\s,]+/g, ',').split(',');
        } 
        GroupsService.editStudent(groupId, student)
            .then(responseData => {
                $window.history.go(-1);
            })
            .catch(err => console.log(err));
    }
})