const express = require('express');
const router = express.Router();
// const genres = require('../data');
const Genre = require('../models/genres');
const Joi = require('joi');
const {createGenre,updateGenre,deleteGenre,getGenres,getGenre} = require('../controllers/genres');
const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');

// Function to validate input schema
// Removed the Tags property 
// ,tags
// Add removed the tags validation with Joi
// tags : Joi.array().max(5).min(3).required()

function validateGenre(name) {
    // Creating a schema to validate input 
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
    });

    const result = schema.validate({
        name
    });

    return result;
};

// Route to obtain all the genres
router.get('/',async (req, res) => {
    // Working with Arrays 
    //Response with the Generes data
    // res.send(genres);

    // Working with data Models 
    const genres = await getGenres();

    res.send(genres);
});

//route to obtain a single genre
router.get('/:id',async (req, res) => {
    const id = req.params.id;
    // let genre = genres.find(genre => genre.id === parseInt(id));

    const genre = await getGenre(id);
    if (!genre) return res.status(404).send('The Genre was not found');

    res.send(genre);
});

router.post('/add',auth,async  (req, res) => {
    
    let {name,id,tags} = req.body;

    
    if(!tags) tags = ['Disney','marvel','HBO'];

    
    const result =  validateGenre(name);

    if (result.error) {
        return res.status(400).send(`${result.error.details[0].message}`);
    }

    const newGenre = {
        name
    };

    // /The old way using an array 
    // genres.push(newGenre);

   const genre = await createGenre(newGenre);

    res.send(genre);

});


router.put('/:id',auth,async (req, res) => {

    const id = req.params.id;

    const { name } = req.body;

    // let genre = genres.find(genre => genre.id === parseInt(id));

    // if(!tags) tags = ['Disney','marvel','HBO'] ;


    // Validate that input data is correct
    const result = validateGenre(name);

    if (result.error) {
        return res.status(400).send(`${result.error.details[0].message}`);
    }

    // Checking that the genre still exists in Database
    const genre = await getGenre(id);

    if (!genre) return res.status(404).send('The Genre was not found');

    // genre.name = name;
    const updatedGenre = await updateGenre({
        id,
        name,
        
    });

    res.send(updatedGenre);

});


router.delete('/:id',auth,async (req, res) => {
    const id = req.params.id;

    // let genre = genres.find(genre => genre.id === parseInt(id));
    // if (!genre) return res.status(404).send('The Genre was not found');

    const genre = await getGenre(id);
    
    if (!genre) return res.status(404).send('The Genre was not found');

    // let index = genres.indexOf(genre);

    // genres.splice(index, 1);

    const result = await deleteGenre(id);

    if(result.sucess){
        res.json({msg : 'genre was sucessfully deleted '});
    }else{
        res.send('Genre was not deleted');
    }

});


module.exports = router;

/*
admin User
{
    "email":"ayoMoraks@gmail.com",
    "password":"ayo1234"
}

none admin User
{
    "email":"udochukwu@gmail.com",
    "password":"udo123"
}

*/