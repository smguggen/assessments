const server = require('express');
const app = server();
const api = server();
require('dotenv').config();

app.use(server.static('./dist'));

let appListener = app.listen(3300, () => console.log('App listening on port 3300')); 

appListener.on('error', (e) => {
    if (e.code != 'EADDRINUSE') {
        appListener.close(() => {
            appListener = app.listen(3300, () => console.log('App listening on port 3300')); 
        });
        console.log(e);
    }
});

const Query = require('./api');
const q = new Query();

api.use(server.json());
api.use(server.urlencoded({ extended: true }));

api.get('/', (req, res) => q.getSavedArticles.call(q, req, res));
api.post('/', (req, res) => q.saveArticle.call(q, req, res));
api.delete('/', (req, res) => q.deleteArticle.call(q, req, res));

let apiListener = api.listen(3301, () => console.log('Api listening on port 3301')); 

apiListener.on('close', () => q.end());
apiListener.on('error', (e) => {
    if (e.code != 'EADDRINUSE') {
        apiListener.close(() => {
            apiListener = api.listen(3301, () => console.log('Api listening on port 3301')); 
        });
        console.log(e);
    }
});
