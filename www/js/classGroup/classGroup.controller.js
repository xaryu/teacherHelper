'use strict';

angular.module('starter.controllers').controller('ClassGroupCtrl', function($scope, $stateParams) {
    $scope.currentId = $stateParams.groupId;
    $scope.group = $stateParams.group;
    $scope.groupName = $scope.group.name;
}); 