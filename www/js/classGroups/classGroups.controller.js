'use strict';

angular.module('starter.controllers').controller('ClassGroupsCtrl', function($scope, $state) {
    $scope.classGroups = [
        { 
            name: 'Grupa 1024',
            id: 1, 
            groupMembers: [
                {
                    studentName: 'Popescu Mihai',
                    studentId: 10
                },
                {
                    studentName: 'Ionescu Voda',
                    studentId: 11                                 
                }
            ] 
        },
        { 
            name: 'Master 354',
            id: 2, 
            groupMembers: [
                {
                    studentName: 'Ionel Andrei',
                    studentId: 12
                }
            ] 
        },
        { 
            name: 'Doctorat 2304',
            id: 3, 
            groupMembers: [
                {
                    studentName: 'Suceveanu Paul',
                    studentId: 13              
                },
                {
                    studentName: 'Mircea Voda',
                    studentId: 14                    
                }
            ] 
        },
        
    ]

    $scope.openGroup = function(group) {
        return $state.go('app.classGroup', {groupId: group.id, group: group});
    }
})  