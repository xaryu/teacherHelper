'use strict';

angular.module('starter.controllers').controller('ClassGroupsCtrl', function($scope, $state, $ionicModal, GroupsService) {

    $scope.initModal = () => {
        $ionicModal.fromTemplateUrl('js/modals/addGroup.modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
            modal.show();
        });
    }

    $scope.createGroup = (group) => {
        GroupsService.createGroup(group)
            .then(responseData => {
                $scope.classGroups.push(responseData);
                $scope.modal.remove();
            })
            .catch(e => console.log(e));
    }

    $scope.deleteGroup = (group) => {
        GroupsService.deleteGroup(group)
            .then(responseData => {
                const index = $scope.classGroups.indexOf(group);
                $scope.classGroups.splice(index, 1);
                //TODO check out why the DOM is not updating on splice
                $scope.$apply();
            })
            .catch(e => console.log(e));
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