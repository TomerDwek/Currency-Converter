const http = require('http');
const routes = require('./routes');
const mongoose = require('mongoose');

const conversionService = require('./service/conversionService');
const environment_variables = require('./environment_variables.json');

mongoose.connect(
    environment_variables.connectionString,
    {
        useNewUrlParser: true
    }, () => {
        conversionService()
    }
);


const port = process.env.PORT || 3000;

const server = http.createServer(routes);

server.listen(port);