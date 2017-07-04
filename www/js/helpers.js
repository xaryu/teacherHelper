angular.module('starter').service('HelpersService', function () {
    this.makeCall = (address, requestBody, errorMessage = 'Could not get data') => {
        return new Promise((resolve, reject) => {
            makeFetch(address, requestBody)
            .then(res => {
                if(res.status !== 200) {
                    return reject(new Error(errorMessage));
                }
                return res.text();
            })
            .then(text => {
                if(!text) {
                    resolve();
                }
                try {
                    const json = JSON.parse(text);
                    resolve(json);
                }
                catch(e) {
                    reject(e);
                }
            })
            .catch(() => reject(new Error('There was a problem with the request')));
        });
    }

    this.makeFetch = (address, requestBody) => {
        return fetch(address, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
    }

    this.fetchData = (address) => {
        return fetch(address, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
});