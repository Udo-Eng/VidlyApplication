const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {User} = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');


function validateUserLogin(user) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);

  }

router.post('/',async (req,res)=> {
    
    const {email,password} = req.body;


    // validate the user input 
    const {error} = validateUserLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);


    // check that the user doen't exist in database
    let user = await User.findOne({email: email});
    if(!user) return res.status(400).send('Invalid email or password ');


    const validPassword = await bcrypt.compare(password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password ');

// send a jsonwebToken to the user on sucessful sign up
  const token = user.generateAuthToken();

  //  return res.send(token);

     
});


module.exports = router;