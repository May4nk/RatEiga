//controllers/movies
import mongoose from 'mongoose';

import MoviesModel from '../models/movies.js';

const mongooseChecker = (id, res) => {
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({ msg: ' Not Valid Id ' });
    }
}

//to get all poster for movies
export const getMovies = async (req, res) => {
    
    try{
        const moviesAll = await MoviesModel.find();
        
        res.status(200).json(moviesAll);
    }catch(err){
        res.status(404).json({ msg: 'No Movies Found' });
    }
}


//to create poster for movies
export const createMovies = async (req, res) => {
    const movie = req.body;

    const newMovie = new MoviesModel(movie);
    
    try{
        await newMovie.save();

        res.status(201).json(newMovie);
    }catch(err){
        res.status(400).json({ msg : ' Cant create Poster'});
    } 
}


//to update a poster for movies
export const updateMovies = async (req, res) => {
    const { id : _id } = req.params;
    const newMovie = req.body;

    mongooseChecker(_id, res) ;
    
    const updateMovie = { ...newMovie , _id }
    
    const updatedMovie = await MoviesModel.findByIdAndUpdate(_id, updateMovie, { new: true});
    
    res.json(updatedMovie);
}


//to delete a  poster for movies
export const deleteMovies = async (req, res) => {
    const { id }= req.params;
    
    mongooseChecker(id, res);
   
    await MoviesModel.findByIdAndRemove( id );
    
    res.json({ msg: 'Post deleted successfully' });

}


//to rate posters
export const rateMovies = async (req, res) => {
    const { id } = req.params;
    const { rate, idx } = req.body;

    if(!req.userId) return res.json({ msg: 'Unauthenticated' });
    
    mongooseChecker(id, res);
    
    const post = await MoviesModel.findById(id);

    const indx = post.rating.filter(p => (p.idx === idx) );
   
    if(indx.length === 0){
        post.rating.push(req.body)
    } else {
        indx[0].rate = req.body.rate;
    }

    const update = await MoviesModel.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(update);

}
