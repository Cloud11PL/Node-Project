const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./router/router.js')(app);
const db = require('./config/db.config.js');
  
// force: true will drop the table if it already exists
db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(res => {
        db.sequelize.sync({force: false})
        console.log('Drop and Resync with { force: false }');
      });


  const server = app.listen(8080, function () {
 
  const host = server.address().address
  const port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})