const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
/*
const dbP = {};
const dbI = {};
 */

db.Sequelize = Sequelize; //Users
db.sequelize = sequelize;

/*
dbI.Sequelize = Sequelize; //Ilnesses
dbI.sequelize = sequelize;

dbP.sequelize = sequelize; //Patients
dbP.Sequelize = Sequelize;
*/

db.user = require('../model/user.model.js')(sequelize, Sequelize);
db.patient = require('../model/patient.model.js')(sequelize, Sequelize);
db.ilness = require('../model/ilness.model.js')(sequelize, Sequelize);

db.patient.hasMany(db.ilness, { foreignKey: 'ilnessId', otherKey: 'patientId'} );
//db.ilness.hasOne(db.patient, { foreignKey: 'id' });
/*
module.exports = dbP;
module.exports = dbI;
*/
module.exports = db;