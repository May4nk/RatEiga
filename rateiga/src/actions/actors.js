//action/actors.js
import { getActors, postActors, patchActors, removeActors } from '../api/actors.js';

// to GET all actor
export const fetchActors = () => async(dispatch) => {
    try{
        const { data } = await getActors();

        dispatch({ type: 'GET', payload: data });
    }catch(err){
        console.log(err);
    }
}

// to POST a actor
export const createActors = (actor) => async(dispatch) => {
    try{
        const { data } = await postActors(actor);

        dispatch({ type: 'POST', payload: data });
    }catch (err){
        console.log(err);
    }
}

// to PATCH a actor
export const updateActors = (id, newActor) => async(dispatch) => {
    try{
        const { data } = await patchActors(id, newActor);

        dispatch({ type: 'PATCH', payload: data });
    }catch(err){
        console.log(err);
    }
}

// to DELETE a actor
export const deleteActors = (id) => async(dispatch) => {
    try{
        await removeActors(id);

        dispatch({ type: 'DELETE', payload: id });
    }catch(err){
        console.log(err);
    }
}
