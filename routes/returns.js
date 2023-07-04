const  express = require('express');
const router = express.Router();
const {Rental} = require('../models/rentals');
const auth = require('../middleware/auth');


router.post('/',auth,async (req,res) => {

    let {customerId,movieId} = req.body;

    if(customerId === '') return res.status(400).send('customer Id is not found ');
    
    if(movieId === '') return res.status(400).send('customer Id is not found ');

    const rental = await Rental.findOne({
        'customer._id' : customerId,
        'movie._id' : movieId
    });

    if(!rental) return res.status(404).send('rental is not found');

    if(rental) return res.status(400).send('rental already processed');

});


module.exports = router;