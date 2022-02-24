//model/movies
import mongoose from 'mongoose';

//movies schema
const moviesSchema = mongoose.Schema({
    name: { type: String, required: true },
    released: { type: Date, required: true },
    rating: [{ idx: String, rate: Number }],
    about: { type: String },
    poster: { type: String },
    actors: { type: [String] },
    producer: { type: String },
    createdAt: { type: Date, default: new Date() }
});

const MoviesModel = mongoose.model('movies', moviesSchema);

export default MoviesModel;
