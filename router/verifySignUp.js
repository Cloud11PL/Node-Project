const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;

checkDuplicateUserNameOrEmail = (req, res, next) => {
	User.findOne({
		where: {
			username: req.body.username
		} 
	}).then(user => {
		if(user){
			res.status(400).send("Fail: Username is already taken!");
			return;
		}
		User.findOne({ 
			where: {
				email: req.body.email
			} 
		}).then(user => {
			if(user){
				res.status(400).send("Fail -> Email is already in use!");
				return;
			}				
			next();
		});
	});
}

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;

module.exports = signUpVerify;