const db = require('../config/db.config.js');
const config = require('../config/config.js');
const Patient = db.patient;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
	console.log("Processing func -> SignUp");	
	Patient.create({
		firstname: req.body.firstname,
		surname: req.body.surname,
		dateOfBirth: req.body.dateOfBirth,
		sex: req.body.sex,
        PESEL: req.body.PESEL
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
        limit:25
    }).then(patients => {
        console.log("Patients imported succesfully")
        res.status(200).json({
            "description": "Patients Content Page",
            "patients": patients
		});
    }).catch(err => {
        res.send(500).send("Error: " + err.toString());
    })
}

exports.destroyByID = (req,res) => {
    console.log("Destory patient by ID")
    console.log(req.params.id)
    const deleteId = req.params.id
    Patient.destroy({
        where: {
            id: deleteId
        }
    }).then(msg => {
        console.log(`Patient by the ID of ${deleteId}`)
        res.status(200).json({
            "description": `Patient by the ID of ${deleteId}`,
            "destroyed": true
        })
    }).catch(err => {
        res.send(500).send("Error -> " + err)
    })
}