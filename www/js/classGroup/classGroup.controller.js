'use strict';

angular.module('starter.controllers').controller('ClassGroupCtrl', function($scope, $stateParams, $state, $ionicModal) {
    $scope.currentId = $stateParams.groupId;
    $scope.group = $stateParams.group;
    $scope.groupName = $scope.group.name;

    $scope.openStudentEntry = function(student, group) {
        $state.go('app.classGroup.student', {studentId: student.studentId, student: student, groupId: group.id});
    }

    $ionicModal.fromTemplateUrl('js/modals/addStudent.modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.createStudent = function(student) {
        debugger;
    }
}); 