const resources = require('../resources/model');
const {logger}=require('./../startup/logging');

const file='./../OfficeTest.txt';
const importFile=require('./localFile');

let interval, sensor;
const model = resources.sensor;
const pluginName = model.name;
let localParams = {'simulate': false, 'frequency': 5000}; //default,change anytime

 exports.start= function (params) {
  localParams = params;
  if (params.simulate) {
    simulate();
  } else {
    readFile(file);
  }
};

// exports.stop = function () {
//   if (params.simulate) {
//     clearInterval(interval);
//   } else {
//     sensor.unexport();
//   }
//   console.info('%s plugin stopped!', pluginName);
// };

function simulate() {
  interval = setInterval(function () {
    model.value = Math.random() * 101;
    model.time=new Date();
  }, localParams.frequency);
   logger.info(`simulated ${pluginName} started!`);
};

 function readFile(f){
    interval =  setInterval(async function () {
    model.value =await importFile.readLocalFile(f);
    model.value=parseInt(model.value);
    model.time=new Date();
    // console.log(model.time+model.value); //tested, 1s late than python
  }, localParams.frequency);
    logger.info(`connected ${pluginName} started!`);
}
