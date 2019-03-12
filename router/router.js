const verifySignUp = require('./verifySignUp');
const verifyJwtToken = require('./verifyJwtToken');
const authJwt = require('./verifyJwtToken');
const cors = require('cors');

module.exports = function(app) {
    const controller = require('../controller/controller.js');
    const patientController = require('../controller/patientController.js');
    const ilnessController = require('../controller/ilnessController.js');
 
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail], controller.signup);

	app.post('/api/auth/signin', controller.signin);

	app.post('/api/auth/patient', [verifyJwtToken.verifyToken], patientController.register);
	
    app.get('/api/getAll', [verifyJwtToken.verifyToken], patientController.getAll);

    app.delete('/api/destroyByID/:id', [verifyJwtToken.verifyToken], patientController.destroyByID);

    app.post('/api/ilness', ilnessController.addIlness);

};