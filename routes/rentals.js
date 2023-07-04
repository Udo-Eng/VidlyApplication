const {Rental, validateRental} = require('../models/rentals'); 
const {Movie} = require('../models/movies'); 
const Customer = require('../models/customers'); 
// const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');

Fawn.init("mongodb://127.0.0.1:27017/vidly");

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validateRental(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

// const result = rental.save();

// movie.numberInStock -= 1;
// movie.save();

// res.send(rental);

//   Create a new Fawn Task
try{
    new Fawn.Task().save('rentals', rental)
    .update('movies',{_id : movie._id},{$inc : { numberInStock : -1}})
    .run();
    
      res.send(rental);

}catch(err){
   res.status(500).send("Rental was not updated sucessfully ")
}

});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});



// async function getRental(id){
//     const rental = await Rental.findById(id);

//     if(!rental) console.log('rental not found ');

//     return rental;
// }


// getRental("6369187b0171ff1b58c95d7f").then(rental => {
//     console.log(rental)
// }).catch(err => console.error(`${err.message}`));


module.exports = router;