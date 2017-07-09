'use strict';

angular.module('starter.controllers').controller('ClassGroupCtrl', function($scope, $stateParams, $state, $ionicModal, GroupsService) {
    $scope.currentId = $stateParams.groupId;
    $scope.group = $stateParams.group;
    $scope.groupName = $scope.group.name;

    getStudents()
        .then(studentsResult => {
            $scope.groupStudents = studentsResult;
        })
    
    async function getStudents () {
        const getStudentsResponse = await GroupsService.getGroupData($scope.group);
        if(getStudentsResponse.status !==200) {
            throw new Error('Eroare la preluarea studentilor');
        }
        return getStudentsResponse.json();
    }

    $scope.openStudentEntry = function(student, group) {
        $state.go('app.classGroup.student', {studentId: student._id, student: student, groupId: group._id});
    }

    $ionicModal.fromTemplateUrl('js/modals/addStudent.modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $ionicModal.fromTemplateUrl('js/modals/groupSettings.modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.settingsModal = modal;
    });

    $scope.createStudent = function(student) {
        debugger;
    }
}); 