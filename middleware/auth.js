const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {

    const token = req.header('x-auth-token');

    if (!token) res.status(401).send('Acess Denied. no Token provided.');
    
    try {
        // decode the payload and add the payload 
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded;
        next();

    } catch (err) {
        return res.status(400).send('Invalid Token');
    }


}


module.exports = auth;