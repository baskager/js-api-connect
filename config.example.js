// example config using the Rijksmuseum API
const apiConfig = {
    rijksmuseum: {
        key: 'INSERT-YOUR-OWN-API-KEY',
        baseUrl: 'https://www.rijksmuseum.nl/api/nl',
        endpoints: {
            collection: {
                localstorage: {
                    cache: true,
                    name: 'collection'
                },
                GET: {
                    path: '/collection',
                    params: {
                        key: 'default',
                        format: 'json',
                        imgonly: true,
                        // Search query for the collection
                        q: ''
                    }
                }
            }
        }
    }
};

export default apiConfig;
