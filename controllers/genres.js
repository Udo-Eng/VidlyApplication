// Implement all the CRUD  operations on Genres
const {Genre} = require('../models/genres');


async function getGenre(id) {
    try {
        const genre = await Genre.findOne({ _id: id });

        return genre;

    } catch (err) {
        throw new Error(`${err.message}`);
    }
}



async function getGenres() {
    try {
        const genres = await Genre.find().sort('name');
        return genres;
    } catch (err) {
        throw new Error(`${err.message}`);
    }
}



async function createGenre(newGenre) {
    try {
        let genre = new Genre(newGenre);

        const result = await genre.save();

        return result;

    } catch (err) {
        throw new Error(`${err.message}`);
    }
}


async function deleteGenre(id) {
    try {
        const result = await Genre.deleteOne({ _id: id });

        if (result) {
            return {
                sucess: true,
            }
        }
    } catch (err) {
        throw new Error(`${err.message}`);
    }
}


async function updateGenre(genre) {
    try {
        const updatedGenre = await Genre.findOneAndUpdate({ _id: genre.id }, {
            $set: {
                name: genre.name,
            }
        },
            {
                new: true
            });

        return updatedGenre;

    } catch (err) {
        throw new Error(`${err.message}`);
    }
}


module.exports = {
    createGenre, updateGenre, deleteGenre, getGenres, getGenre
}