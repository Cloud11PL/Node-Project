/*
var mysql = require('mysql');

return mysql.createConnection({
    host: '139.59.156.31',
    port: '3306',
    user: 'user_plus',
    password: 'nodeconnection',
    database: 'node_testing',
});
*/

const Sequelize = require('sequelize'),require('./../config');

module.exports = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    config.db.details
);

