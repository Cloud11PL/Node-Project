const env = {
  database: 'node_testing',
  username: 'user_plus',
  password: 'nodeconnection',
  host: '139.59.156.31',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};
 
module.exports = env;