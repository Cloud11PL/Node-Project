const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const db = require('../config/db.config.js');
const User = db.user;

verifyToken = (req, res, next) => {
	let input = req.headers['x-access-token'] || req.headers['authorization'];
	console.log(input)

	if (!input) {
		return res.status(401).json({ 
			auth: false, message: 'No token provided. Unauthenticated.' 
		});
	}

	const token = input.replace(/\b\S+\s/ig,'')
	jwt.verify(token, config.secret, (err, decoded) => {
		console.log(err)
		if (err) {
			return res.status(401).json({ 
					auth: false, 
					message: 'Unauthenticated. Error: ' + err 
				});
		}
		req.userId = decoded.id;
		next()
	});
};

let authJwt = {};
authJwt.verifyToken = verifyToken;

module.exports = authJwt;