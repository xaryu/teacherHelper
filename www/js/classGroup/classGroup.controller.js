'use strict';

angular.module('starter.controllers').controller('ClassGroupCtrl', function($scope, $stateParams, $state, $ionicModal, GroupsService, $rootScope, $ionicListDelegate) {
    $scope.currentId = $stateParams.groupId;
    $scope.group = $stateParams.group;
    $scope.groupName = $scope.group.name;
    $scope.newStudent = {
        group: null
    };
    $scope.attendingStudentsLocal = [];

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

    $scope.openAddStudentModal = function() {
         $ionicModal.fromTemplateUrl('js/modals/addStudent.modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();            
        });
    }

    $scope.createStudent = function() {
        if(typeof($scope.newStudent.notaTest) == 'string') {
            $scope.newStudent.notaTest = $scope.newStudent.notaTest.replace(/[\s,]+/g, ',').split(',');
        }
        if(typeof($scope.newStudent.notaTeme) == 'string') {
            $scope.newStudent.notaTeme = $scope.newStudent.notaTeme.replace(/[\s,]+/g, ',').split(',');
        }
        GroupsService.createStudent($scope.group, $scope.newStudent)
            .then(responseData=> {
                $scope.groupStudents.push(responseData);
                $scope.modal.remove();
            })
            .catch(err=> console.log(err))
    }
    
    $scope.saveGroup = function(group) {
        GroupsService.editGroup(group)
            .then((responseData) => {
                console.log(responseData);
                $scope.settingsModal.remove();
            })
            .catch(err => console.log(err));
    }

    $scope.markAsAttending = function(student) {
        $rootScope.atttendingStudents.push(student);
        $scope.attendingStudentsLocal.push(student);
        $ionicListDelegate.closeOptionButtons(false);
    }

    $scope.updateAttendance = function() {
        if($scope.attendingStudentsLocal.length !== 0) {
            for(var student of $scope.attendingStudentsLocal) {
                student.nrPrezente+=1;
                GroupsService.editStudent($scope.currentId, student)
                .then(responseData => {
                    $scope.attendingStudentsLocal = [];
                    $scope.$apply();
                })
                .catch(err => console.log(err));
            }
        }
    }

    $scope.deleteStudent = function(student) {
        GroupsService.deleteStudent($scope.currentId, student)
            .then(responseData => {
                const index = $scope.groupStudents.indexOf(student);
                $scope.groupStudents.splice(index, 1);
                $scope.$apply();
                $ionicListDelegate.closeOptionButtons(false);        
            })
    }

     $scope.openStudentEntry = function(student, group) {
        $state.go('app.classGroup.student', {studentId: student._id, student: student, group: group, groupId: group._id});
    }
}); 