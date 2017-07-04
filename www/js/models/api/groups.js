angular.module('starter').service('GroupsService', ['HelpersService', function (HelpersService) {
    const groupsEndpointAddress = 'http://localhost:8080/api/groups';
    this.getGroupsData = () => {
        return new Promise((resolve, reject) =>
            HelpersService.fetchData(groupsEndpointAddress)
                .then(resolve)
        )
    }
}])