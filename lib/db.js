const mongoose = require('mongoose');
const config = require('config');


function connectToDataBase(){
    const db = config.get('db');
    mongoose.connect(db).then(()=>{
        console.log(`Connected to ${db} sucessfully ....`);
    }).catch((err)=>{
        console.error(`Connection to ${db}  failed. \n Error : ${err.message}`);
    });
}

module.exports = connectToDataBase;