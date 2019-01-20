//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 
var mysql = require('mysql');

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

/*
const con = mysql.createConnection({
  host: '139.59.156.31',
  port: '3306',
  user: 'node_connection',
  password: 'nodeconnection',
  database: 'node_testing'
});
*/

//Initiallising connection string
/*
var dbConfig = {
    host: '139.59.156.31',
    user: 'node_tester_local',
    password: 'nodeconnection',
    database: 'node_testing',
    port: 3306,
};
*/

const mc = mysql.createConnection({
    host: '139.59.156.31',
    port: '3306',
    user: 'node_tester_local',
    password: 'nodeconnection',
    database: 'node_testing',
    //port: 3306,
});

mc.connect();

app.get('/', function(req,res){
    console.log('Connected!! I guess');
    mc.query('SELECT * FROM patient', (err,rows) => {
        if(err) throw err;

        console.log('Data received');
        console.log(rows);
    })
});

//Post single patient ok
//Get all patients ok
//Get specific patient ok
//Update patient data 

//Get all patients
app.get('/patients', function(req,res){
    mc.query('SELECT * FROM patient', (error,results,fields) => {
        if(error) throw error;

        return res.send({error: false, data: results, message: 'Patient list'});
    })
});

//Add a patient
var postSQL = `INSERT INTO patient
                (
                    firstname, surname, marital_status, sex, phone_number
                )
                VALUES
                (
                    ?, ?, ?, ?, ?
                )`;

app.post('/patient', (req,res) => {
    let patient = req.body;
    if(!patient){
        return res.status(400).send({error:true, message: 'No data provided'});
    }
    console.log(patient);
    mc.query(postSQL,[ patient.firstname, patient.surname, patient.marital_status,
    patient.sex, patient.phone_number ], function (error, results, fields) {
           if(error) throw error;
           return res.send({error: false, data: results, message: 'Patient has been added to the database'});
       } );
});

//Get patient by ID
app.get('/patient/:id', (req,res) => {
    let patient_id = req.params.id;

    mc.query('SELECT * FROM patient where id=?', patient_id, function(error, results,fields) {
        if (error) throw error;
        return res.send({error: false, data: results[0], message: 'Requested patient'});
    });
});

//Update patient by ID
//Each update has to individual i guess
app.put('/patient/update', (req, res) => {
    console.log(req.body);
    let patient_id = req.body.patient_id; //ID TO UPDATE
    let patient_column = req.body.patient_column;
    let patient_data = req.body.patient_data;
    console.log(patient_data);

    if(!patient_id || !patient_column || !patient_data){
        return res.status(400).send({error: patient, message: 'Provide valid data'});
    }

    mc.query(`UPDATE patient SET ${patient_column} = '${patient_data}' WHERE id = ${patient_id}`, (error, results, fields) => {
        if(error) throw error;
        return res.send({error: false, data: results, message: 'Patient has been updated'});
    });
});

/*
    mc.query('INSERT INTO patient ',
     { firstname : patient.firstname,
       surname: patient.surname,
       marital_status: patient.marital_status,
       sex: patient.sex,
       phone_number: patient.phone_number }, function (error, results, fields) {
*/


/*
//Function to connect to database and execute query
var  executeQuery = function(res, query){             
    sql.createConnection(dbConfig, function (err) {
        if (err) {   
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
                 }
                 else {
                        // create Request object
                        var request = new sql.Request();
                        // query to the database
                        request.query(query, function (err, res) {
                          if (err) {
                                     console.log("Error while querying database :- " + err);
                                     res.send(err);
                                    }
                                    else {
                                      res.send(res);
                                           }
                              });
                      }
     });           
}

/*
con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
})

con.query('SELECT * FROM patient', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:\n');
    console.log(rows);
});
*/

/*
app.get("/", function(req,res){
    var que;ry = "select * from patient";
    executeQuery(res,query);
});

//GET API
app.get("/api/patient", function(req , res){
    var query = "select * from patient";
    executeQuery (res, query);
});

//POST API
app.post("/api/user", function(req , res){
    var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
    executeQuery (res, query);
});

//PUT API
app.put("/api/user/:id", function(req , res){
    var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
    executeQuery (res, query);
});

// DELETE API
app.delete("/api/user /:id", function(req , res){
    var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
    executeQuery (res, query);
});
*/