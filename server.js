var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())
require('./router/router.js')(app);
const db = require('./config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize
.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(res => {
        db.sequelize.sync({force: false})
        console.log('Drop and Resync with { force: false }');
      }
    );
 
//require('./app/route/project.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})