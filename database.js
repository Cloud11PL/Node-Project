const Sequelize = require('sequelize'),require('./../config');

module.exports = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    config.db.details
);

