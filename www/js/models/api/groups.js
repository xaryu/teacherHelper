angular.module('starter').service('GroupsService', ['HelpersService', function (HelpersService) {
    const groupsEndpointAddress = 'http://localhost:8080/api/groups';

    this.getGroupEndpointWithId = (group) => {
        return `${groupsEndpointAddress}/${group._id}`
    }
    
    this.getGroupsData = () => {
        return new Promise((resolve, reject) =>
            HelpersService.fetchData(groupsEndpointAddress)
                .then(resolve)
        )
    }

    this.getGroupData = (group) => {
        return new Promise((resolve, reject) =>
            HelpersService.fetchData(this.getGroupEndpointWithId(group), group)
                .then(resolve)
        )
    }

    this.createGroup = (group) => {
        return HelpersService.makeCall(groupsEndpointAddress, group);
    }

    this.editGroup = (group) => {
        return new Promise((resolve, reject) => {
            HelpersService.editData(this.getGroupEndpointWithId(group), group)
                .then(resolve)
        })
    }

    this.deleteGroup = (group) => {
        return HelpersService.deleteData(this.getGroupEndpointWithId(group), group);
    }

    this.editStudent = (groupId, student) => {
        return HelpersService.editData(`${groupsEndpointAddress}/${groupId}/students/${student._id}`, student);
    }
}])