//action/movies.js
import { fetchPosters, createPosters, updatePosters, deletePosters, likePosters } from '../api/movies';

//to GET all movies
export const getMovies = () => async(dispatch) => {
    try{
        const { data } = await fetchPosters();
        
        dispatch({ type: 'FETCH_ALL' , payload: data });
    }catch(err){
        console.log(err);
    }
}

//to POST a movie
export const createMovies = (poster) => async(dispatch) => {
    try{
        const { data } = await createPosters(poster);
        
        dispatch({ type: 'CREATE' , payload: data });
    }catch(err){
        console.log(err);
    }
}

//to PATCH a movie
export const updateMovies = (id, newPoster) => async(dispatch) => {
    try{
        const { data } = await updatePosters(id, newPoster);

        dispatch({ type: 'UPDATE', payload: data });
    }catch(err){
        console.log(err);
    }
}

//to DELETE a movie
export const deleteMovies = (id) => async(dispatch) => {
    try{
        await deletePosters(id);

        dispatch({ type: 'REMOVE', payload: id });
    }catch(err){
        console.log(err);
    }
}

//to PATCH for rating of movie
export const rateMovies = (id, beta) => async(dispatch) => {
    try{
        const { data } = await likePosters(id, beta);

        dispatch({ type: 'RATE', payload: data });
    }catch(err){
        console.log(err);
    }
}
