'use strict';

angular.module('starter.controllers').controller('ClassGroupsCtrl', function($scope, $state, $ionicModal, GroupsService) {

    $ionicModal.fromTemplateUrl('js/modals/addGroup.modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });


    $scope.createGroup = function(group) {
        debugger;
    }

    getGroups()
        .then(groupsResult => {
            $scope.classGroups = groupsResult;
        })
    
    async function getGroups () {
        const getGroupsResponse = await GroupsService.getGroupsData();
        if(getGroupsResponse.status !==200) {
            throw new Error('Eroare la preluarea grupelor');
        }
        return getGroupsResponse.json();
    }


    $scope.openGroup = function(group) {
        return $state.go('app.classGroup', {groupId: group._id, group: group});
    }

})  