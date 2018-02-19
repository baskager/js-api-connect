export default class Api {
    constructor(config) {
        this.config = config;
    }

    getEndpointsForApi(apiName) {
        return this.config[apiName].endpoints;
    }

    request(apiName, endpoint){
        const self = this;
        return new Promise(function(resolve, reject) {
            const api = self.config[apiName];

            if(!api) reject( new Error('specified API is not defined in the API configuration') );
            if(!endpoint) reject( new Error('specified endpoint is not defined for '+ api.baseUrl +' in the API configuration') );

            // Build the params that will be injected into the url
            const urlParams = self.buildUrlParams(api, endpoint);
            const endpointUrl = api.baseUrl + endpoint.path + urlParams;

            console.log('Fetching '+ endpoint.path +' from' + api.baseUrl);

            var request = new XMLHttpRequest();
            // Search the rijksmuseum collection with the supplied parameters
            request.open('GET', endpointUrl, true);

            request.onload = function() {
                // 200 = success
                if (request.status === 200 ) {
                    var data = JSON.parse(request.responseText);
                    resolve(data);
                } else {
                // We reached our target server, but it returned an error
                    reject( new Error('Server returned an error') );
                }
            };

            request.onerror = function() {
                // There was a connection error of some sort
                reject( new Error('Could not connect to Rijksmuseum API') );
            };

            request.send();
        });

    }

    buildUrlParams(api, endpoint) {
        let params = endpoint.params;

        let urlParams = Object.keys(params).reduce(function(url, param, index, array) {
            // Add an ampersand if the loop is not yet at the last object
            let urlAddition = (index !== (array.length-1) ? '&' : '');
            let value = params[param];

            if(param === 'key' && value === 'default') value = api.key;

            return url +  param + '=' + value + urlAddition;
        }, '?');

        return urlParams;
    }
}
