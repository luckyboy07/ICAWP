/*jshint camelcase: false */

'use strict';
module.exports = {
    env: 'production',
    db_host: process.env.DB_HOST || 'sql12.freemysqlhosting.net',
    db_user: process.env.DB_USER || 'sql12174534',
    db_password: process.env.DB_PASSWORD || 'mIiZLPy4De',
    db_name: 'sql12174534',
    db_port: 3306,
    port: 3000, // PLEASE DONT REMOVE 'process.env.PORT'
    ip: process.env.IP,
    socket_port: process.env.SOCKET_PORT || 3333,
    app_name: process.env.APP_NAME || 'ICC',
    // api_host_url: process.env.API_HOST_URL || 'http://localhost:3000',
    api_host_url: process.env.API_HOST_URL || 'https://icawp.herokuapp.com:3000',
    frontend_host_url: process.env.FRONTEND_HOST_URL || 'https://icawp.herokuapp.com:3000',
    api_version: process.env.API_VERSION || '/api/1.0',
    app_version: process.env.APP_VERSION || '/1.0',
    token_secret: 'ICCW',
   
};
