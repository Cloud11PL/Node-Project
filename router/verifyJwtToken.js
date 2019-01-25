const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const db = require('../config/db.config.js');
const User = db.user;

verifyToken = (req, res, next) => {
	const token = req.headers['x-access-token'] || req.headers['authorization'];
	if (token.startsWith('Bearer ')) {
		//nowa zm
    	token = token.slice(7, token.length);
  	}
	//regexp
	if (!token){
		return res.status(403).send({ 
			//jsonem
			auth: false, message: 'No token provided.' 
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		req.userId = decoded.id;
		next();
	});
};

let authJwt = {};

authJwt.verifyToken = verifyToken;

module.exports = authJwt;