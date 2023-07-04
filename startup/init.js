const express = require('express');
const cors = require('cors');
const config = require('config');
const logger = require('./logging');
const path = require('path');

module.exports = function(app){
    
if(!config.get('jwtPrivateKey')){
    logger.error('FATAL ERROR jwtPrivateKey is not defined');
    process.exit(1);
}

app.disable('x-powered-by');

app.use(express.urlencoded({extended: true}));

app.use(express.json());


// middleware to set Cross origin resource sharing CORS
app.use(cors());

app.use(express.static(path.join(__dirname,'..','public')));
// app.use(express.static('public'));

process.on('uncaughtException',(ex) => {
    logger.error(`An UNCAUGHTEXCEPTION OCCURED ${ex.message}`,ex);
    process.exit(1);
})

process.on('unhandledRejection',(ex)=>{
    logger.error(`An UnhandledRejection exception occured!!! `,ex);
    process.exit(1);
})

}