const jwt = require('jsonwebtoken');
const config = require('config');

function admin(req, res, next) {

    // return with a 403 meaning forbidden 
    if(!req.user.isAdmin) return res.status(403).send('Acess Denied');
   
    next();
}

module.exports = admin;

