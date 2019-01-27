const db = require('../config/db.config.js');
const config = require('../config/config.js');
const Patient = db.patient;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
	// Save User to Database
	console.log("Processing func -> SignUp");
	
	Patient.create({
		firstname: req.body.firstname,
		surname: req.body.surname,
		dateOfBirth: req.body.dateOfBirth,
		sex: req.body.sex,
        PESEL: req.body.PESEL
        /*
        choroby genetyczne, operacje, alergie 
        */
	}).then(patient => {
        console.log("Patient registered succesfully")
        res.status(200).json({
            "description": "Patient Content Page",
            "user": patient
		});
    }).catch(err => res.status(500).send("Error -> " + err));
}

exports.getAll = (req,res) => {
    console.log("Get all patients from DB");

    Patient.findAll({
        /*
        To trzeba potem fajnie zrobic
        */
        limit:25
    }).then(patients => {
        console.log("Patients imported succesfully")
        res.status(200).json({
            "description": "Patients Content Page",
            "patients": patients
		});
    }).catch(err => {
        res.send(500).send("Error -> " + err);
    })
}

exports.destoryByID = (req,res) => {
    console.log("Destory patient by ID");

    Patient.destroy({
        where: {
            id: req.body.id
        }
    }).then(msg => {
        console.log(`Patient by the ID of ${req.body.id}`);
        res.status(200).json({
            "description": `Patient by the ID of ${req.body.id}`,
            "destroyed": true
        })
    }).catch(err => {
        res.send(500).send("Error -> " + err);
    })
}