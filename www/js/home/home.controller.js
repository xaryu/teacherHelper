'use strict';

angular.module('starter.controllers').controller('HomeCtrl', function($scope, $state) {
    $scope.goToGroups = () => {
        return $state.go('app.classGroups');
    }
})
