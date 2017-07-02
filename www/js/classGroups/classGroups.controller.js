'use strict';

angular.module('starter.controllers').controller('ClassGroupsCtrl', function($scope, $state) {
    $scope.classGroups = [
        { 
            name: 'Grupa 1024',
            id: 1, 
            groupMembers: [
                {
                    studentName: 'Popescu Mihai'
                },
                {
                    studentName: 'Ionescu Voda'                    
                }
            ] 
        },
        { 
            name: 'Master 354',
            id: 2, 
            groupMembers: [
                {
                    studentName: 'Ionel Andrei'
                }
            ] 
        },
        { 
            name: 'Doctorat 2304',
            id: 3, 
            groupMembers: [
                {
                    studentName: 'Suceveanu Paul'
                },
                {
                    studentName: 'Mircea Voda'
                }
            ] 
        },
        
    ]

    $scope.openGroup = function(group) {
        return $state.go('app.classGroup', {groupId: group.id, group: group});
    }
})  