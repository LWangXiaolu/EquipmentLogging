const express = require('express');
const router = express.Router();
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');

router.post('/', async (req, res)=>{
//validation
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user=await User.findOne({ name: req.body.name});
    if (!user) return res.status(400).send("wrong user name or password");
    if(user.password !== req.body.password) return res.status(400).send("wrong user name or password");
    //return 200
    res.status(200).send(true);
});

module.exports=router;
