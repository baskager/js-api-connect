# js-api-connect
An easy-to-use microlibrary for connecting with REST API's in JavaScript using ES6 modules and classes

### Requirements
- ES6 modules
- ES6 classes

### Implementing js-api-connect in your project
Clone the contents of this repository to your source:

``git clone git@github.com:baskager/js-api-connect.git ``

Create a config directory:

``mkdir config``

Copy the example configuration to your new config directory and name it js-api-connect.js:

``cp js-api-connect/config.example.js config/js-api-connect.js``

**Don't forget to define your API and it's endpoints in the config!**


Import the following two lines at the top of the file where you wish to use js-api-connect

    import apiConfig from './config/js-api-connect.js';
    import Api from './js-api-connect/Api.class.js';

Make a new API object

    const api = new Api(apiConfig);

Get the endpoints and set a parameter (optional, default parameters are set in the config). The request body can be manipulated in the same manner.

    const endpoints = api.getEndpointsForApi('rijksmuseum');

    endpoints.collection.GET.params.type = "portrait";

Make a request to one of the API's defined in your config

    api.request('rijksmuseum', endpoints.collection.GET).then(function(data) {
        console.dir(data);
    }).catch(function(err){
        console.log(err);
    });

An optional third parameter can be sent to the request method, this has to be an object implementing the HandleApiData method, like so:

    let artist = new Artist(name);

    api.request('rijksmuseum', endpoints.collection.GET, artist).then(function(artistWithData) {
        // The supplied artist will be filled with painting objects
        console.dir(artistWithData);
    }).catch(function(err){
        console.log(err);
    });

Where the artist class is (just an example):

    import Painting from './Painting.class.js';

    export default class Artist {
        constructor(name) {
            this.name = name;
            this.paintings = [];
        }

        getPaintingById(id) {
            return this.paintings.filter(painting => painting.id === id);
        }

        handleApiData(apiData) {
            // Loop through the API and insert articles for each painting
            for (let artObject of apiData.artObjects) {
                this.paintings.push(new Painting(
                    artObject.id,
                    artObject.title,
                    artObject.longTitle,
                    artObject.webImage.url,
                    artObject.principalOrFirstMaker,
                    artObject.links.web
                ));
            }
        }
    }

Happy coding :)
