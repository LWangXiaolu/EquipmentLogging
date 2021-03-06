/*start up
this section intergrate connections to all the deployed modules
*/
const {logger,app}=require('./startup/logging'); //start log book
require('./startup/config')(); //set a key of the server, in command window:set project1=###
require('./startup/routes')(app); //include all the routers
require('./startup/db')(); //set up database and connect to it

/*external plugins*/
const sensorPlugin = require('./plugins/sensor'); //#A
sensorPlugin.start({'simulate': true, 'frequency': 1000}); //#B

// HTTP Server
const port=process.env.PORT || 3002; //in command window: set port=###
const server =app.listen(port, () =>{
  logger.info(`HTTP server started on port ${port}...`);
});
