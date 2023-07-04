const express = require('express');
const router = express.Router();
const {User,validateUser} = require('../models/users');
const _ = require('lodash');
const hashPassword = require('../lib/hash');
const auth = require('../middleware/auth');


router.get('/me',auth,async (req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post('/register',async (req,res)=> {
    
    const {name,email,password} = req.body;


    // validate the user input 
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    // check that the user doen't exist in database
    let user = await User.findOne({email: email});
    if(user) return res.status(400).send('User already registered');

    const hash = await hashPassword(password);


    // Create a new user with credentials and store value in the database
    user = new User({
        name: name,
        email : email,
        password : hash,
    });

    await  user.save();

    // obtain the user token
    const token = user.generateAuthToken();

   return res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
    
     
});


module.exports = router;





