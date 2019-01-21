const verifySignUp = require('./verifySignUp');
const verifyJwtToken = require('./verifyJwtToken');
const authJwt = require('./verifyJwtToken');
 
module.exports = function(app) {
 
    const controller = require('../controller/controller.js');
    const patientController = require('../controller/patientController.js');
    const ilnessController = require('../controller/ilnessController.js');
 
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail], controller.signup);

	app.post('/api/auth/patient', patientController.register);
	
	app.post('/api/auth/signin', controller.signin);

    app.get('/api/getAll', patientController.getAll);
    //verifyJwtToken.verifyToken,
    app.delete('/api/destoryByID', patientController.destoryByID);

    app.post('/api/ilness', ilnessController.addIlness);

};