//this API is to authenticate a user login
const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const mongoose = require('mongoose');
const Joi=require('joi');
const bcrypt=require('bcrypt');
const auth=require('../middlewares/auth');


router.post('/', async (req, res)=>{
//validation for the user model
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user=await User.findOne({ name: req.body.name});
    if (!user) return res.status(400).send("Invalid user name or password");
    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send("Invalid user name or password");
    //valid login
    const token=user.generateAuthToken();
    res.header('x-auth-token', token).send(true);
});
//to distinguish from the valication in the user model. this function is to validate the request
function validate(req){
const schema={
    name:Joi.string().min(5).max(50).required(),
    password:Joi.string().min(5).max(255).required()
}
return Joi.validate(req,schema);
}

module.exports=router;
