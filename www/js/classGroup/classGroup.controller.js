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

    $scope.openSettingsModal = function() {
        $ionicModal.fromTemplateUrl('js/modals/groupSettings.modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.settingsModal = modal;
            $scope.settingsModal.show();
        });
    }

    $ionicModal.fromTemplateUrl('js/modals/addStudent.modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.createStudent = function(student) {
        debugger;
    }

    $scope.saveGroup = function(group) {
        GroupsService.editGroup(group)
            .then((responseData) => {
                console.log(responseData);
                $scope.settingsModal.remove();
            })
            .catch((err) => console.log(err));
    }

     $scope.openStudentEntry = function(student, group) {
        $state.go('app.classGroup.student', {studentId: student._id, student: student, group: group, groupId: group._id});
    }
}); 