const express = require('express');
const router = express.Router();
const { validateMovie } = require('../models/movies');
const { getGenre } = require('../controllers/genres')
const { createMovie, updateMovie, removeMovie, getMovie, getMovies } = require('../controllers/movies');



// Route to obtain all the genres
router.get('/', async (req, res) => {

    //Obtain movies from the database
    const movies = await getMovies();

    res.send(movies);
});

//route to GET a movie
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    const movie = await getMovie(id);
    if (!movie) return res.status(404).send('The Movie was not found');

    res.send(movie);
});


router.post('/add', async (req, res) => {

    const { title, genreId, numberInStock, dailyRentalRate } = req.body;


    const result = validateMovie({
        title: title,
        genreId: genreId,
        numberInStock: numberInStock,
        dailyRentalRate: dailyRentalRate
    });

    if (result.error) {
        return res.status(400).send(`${result.error.details[0].message}`);
    }


    const genre = await getGenre(genreId);

    if (!genre) res.status(404).send("No genre with genre ID found");

    const movie = await createMovie(req.body, genre);

    res.send(movie);

});




// PUT ROUTE TO UPDATE THE MOVIES 
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, genreId, numberInStock, dailyRentalRate } = req.body;

    const result = validateMovie({
        title: title,
        genreId: genreId,
        numberInStock: numberInStock,
        dailyRentalRate: dailyRentalRate
    });

    if (result.error) {
        return res.status(400).send(`${result.error.details[0].message}`);
    }


    const genre = await getGenre(genreId);

    if (!genre) res.status(404).send("No genre with genre ID found");

    const movie = await updateMovie(id, req.body, genre);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);

});



//ROUTE TO REMOVE A MOVIE 
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const result = await removeMovie(id);

    if (!result) return res.status(404).send('The Movie was not found');

    res.send('Movie was  deleted sucessfully');

});


// An error handler for all the movies routes
router.use((err, req, res, next) => {

    if (err) res.send(`An error occured while processing your request 
     Error : ${err.message}
    `);

    next();
})


module.exports = router;