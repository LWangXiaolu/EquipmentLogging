const newUser=require('../resources/userLists.json');
const mongoose = require('mongoose');
const {User} = require('../models/user');

mongoose.connect('mongodb://localhost/project1');

uploadUser();

async function  uploadUser(){
    try {
        await User.insertMany(newUser);
        console.log('done!');
        process.exit();
    } catch(e){
        console.log(e);
        process.exit();
    }
}
