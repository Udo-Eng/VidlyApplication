const express = require('express');
const app = express();
const logger = require('./startup/logging');
const connectToDataBase = require('./lib/db');


// Initialize the express application
require('./startup/init')(app);

// connect to the database
connectToDataBase();
// set up application views 
require('./startup/views')(app);

//register application routes
require('./startup/routes')(app);



// Specify the PORT for the server
const PORT =  process.env.PORT || 5000;

let server;

if(process.env.NODE_ENV !== 'test'){
     server = app.listen(PORT, () => {
        logger.info(`Application running on port ${PORT}`);
    });
}else{
    server = app;
}


module.exports = server;

