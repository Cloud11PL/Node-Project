const db = require('../config/db.config.js');
const config = require('../config/config.js');
const Ilness = db.ilness;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.addIlness = (req,res) => {
    console.log("Add Ilness to the Patient");

    Ilness.create({
		ilness: req.body.ilness,
        present: req.body.present,
        /*
        To ma byc patient ID zeby przypisac!!!
        */
        patientID: req.body.patientID
	}).then(ilness => {
        console.log("Ilness registered succesfully")
        res.status(200).json({
            "description": "Ilness Content Page",
            "user": ilness
		});
    }).catch(err => {
		res.status(500).send("Error -> " + err);
    });
}

exports.getIlnessByID = (req,res) => {
    console.log("Get all patient's ilnesses.")

    Ilness.findAll({
        where: {
            id: req.body.patientsId
        }
    }).then(ilnesses => {
        console.log(`Ilnesses of the Patient by ID of ${req.body.id}`);
        res.status(200).json({
            "description": `Ilnesses of the Patient by ID of ${req.body.id}`,
            "ilnesses": ilnesses
        })
    }).catch(err => {
        res.send(500).send("Error -> " + err);
    })
}