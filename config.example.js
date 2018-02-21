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
                    httpMethod: 'GET',
                    params: {
                        key: 'default',
                        format: 'json',
                        imgonly: true,
                        type: 'painting',
                        S: 'relevance'
                    }
                }
            }
        }
    }
};

export default apiConfig;
