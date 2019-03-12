const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	console.log("Processing func -> SignUp");
	
	User.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	}).then(user => {
        console.log("User registered succesfully")
        res.status(200).json({
            "description": "User Content Page",
            "user": user
		});
    }).catch(err => {
		res.status(500).send("Error -> " + err);
    });
}

exports.signin = (req, res) => {
	console.log("Sign-In");
	console.log(req.body);
	User.findOne({
		where: {
			username: req.body.username
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('User Not Found.');
		}

		console.log(req.body.username)
		console.log(req.body)
		console.log(user.password)

		const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}
		
		const expiresInTime = 30

		const token = jwt.sign({ id: user.id }, config.secret, {
		  expiresIn: expiresInTime 
		});
		
		return res.status(200).send({ auth: true, accessToken: token, expiresIn: expiresInTime});
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}