const mongoose = require('mongoose');
const {logger}=require('./logging');
const config=require('config');


//connect to mongoose
module.exports=function(){
const db=config.get('db');
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>logger.info(`connected to ${db}`)).catch(err=>logger.error(err.message))
}

