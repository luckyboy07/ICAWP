/*jshint camelcase: false */

'use strict';

module.exports = function(database, app, config, log) {
    database.connect(function onConnect(err, isConnected) {
        if (!isConnected) {
            log.error('ENVIRONMENT: ' + config.env + ' Error Connecting To MYSQL database');
        } else {

            app.listen(process.env.PORT || config.port,function connection(err) {
                if (err instanceof Error) {
                    log.error('ENVIRONMENT: ' + config.env + ' Unable to start Server', app.get('port'));
                } else {
                    // log.info('Server started at ' + app.get('port') + ' Using ' + app.get('api_version') + ' Environment: ' + app.get('env'));
                    log.info('ENVIRONMENT: ' + config.env + ' Server started at PORT: ' + config.port + ' Using API VERSION: ' + config.api_version);
                }
            });
        }
    });
};
