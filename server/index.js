'use strict';

const
    express = require('express'),
    expressHandlebars = require('express-handlebars'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cors = require('cors'),
    jwt = require('./helpers/jwt'),
    errorHandler = require('./helpers/errorHandler')

module.exports = function() {
    let server = express(),
        create,
        start;

    create = function(config) {
        let routes = require('./routes');


        // Server settings
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);
        server.set('viewDir', config.viewDir);
        server.set('publicDir', config.publicDir);

        // Returns middleware that parses json
        server.use(bodyParser.json());
        
        // Using CORS
        server.use(cors());

        // use JWT auth to secure the api
        server.use(jwt());

        // global error handler
        server.use(errorHandler);

        // Setup view engine
        server.engine('.hbs', expressHandlebars({
            defaultLayout: 'default',
            layoutsDir: config.viewDir + '/layouts',
            partialsDir: config.viewDir + '/partials',
            extname: '.hbs'
        }));
        server.set('views', server.get('viewDir'));
        server.set('view engine', '.hbs');

        //Set up static files
        server.use(express.static(path.join(__dirname, server.get('publicDir'))));
        
        // server.use('/wit', require('./controllers/apis/person'));


        // Set up routes
        routes.init(server);
    };

    start = function() {
        let hostname = server.get('hostname'),
            port = server.get('port');

        server.listen(port, function () {
            console.log('Express server listening on - http://' + hostname + ':' + port);
        });
    };

    return {
        create: create,
        start: start
    };
};
