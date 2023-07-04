const {Movie} = require('../models/movies');


async function getMovies(){
    try{
        const movies = await Movie.find();

        return movies
    }catch(err){
        throw new Error(`${err.message}`);
    }
     
}


async function getMovie(id){
    try{
        const movie = await Movie.findById(id);

        return movie;
    }catch(err){
        throw new Error(`${err.message}`);
    }
}


async function createMovie(movie,genre){

    let tags =  ['Disney','marvel','HBO'];

    try{
            let newMovie = new Movie({
                title : movie.title,
                genre : {
                    _id : genre._id,
                    name : genre.name,
                    tags : tags
                },
                numberInStock: movie.numberInStock,
                dailyRentalRate: movie.dailyRentalRate
            });

          let result = await  newMovie.save();

          return result;

    }catch(err){
        throw new Error(`${err.message}`);
    }
}


async function updateMovie(id,movie,genre){
     try{
        const updatedMovie = Movie.findByIdAndUpdate(id,{ 
            title: movie.title,
            genre: {
              _id: genre._id,
              name: genre.name
            },
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
          },{new : true});

          return  updatedMovie;

     }catch{
        throw new Error(`${err.message}`)
     }

}


async function removeMovie(id){
    try {
        const  movie = Movie.findByIdAndRemove(id)

        return movie;
    }catch(err){
        throw new Error(`${err.message}`);
    }
}



exports.getMovie = getMovie;
exports.getMovies = getMovies;
exports.createMovie = createMovie;
exports.removeMovie = removeMovie;
exports.updateMovie = updateMovie;