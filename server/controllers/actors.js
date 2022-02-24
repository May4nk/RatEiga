//controllers/actors
import mongoose from 'mongoose';

import ActorsModel from '../models/actors.js';

const mongooseChecker = (id,res) => {
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({ msg: ' Not Valid Id ' });
    }
}

//to get all actors
export const getActors = async(req,res) => {
  try{
      const actorsAll = await ActorsModel.find();
  
      res.status(200).json(actorsAll);
  }catch(err){
      res.status(404).json({ msg: 'No Actors Found' });
  }
    
}

//to create actors
export const createActors = async(req,res) => {
    const actor = req.body;
    
    const newActor = new ActorsModel(actor);
    try{
       await newActor.save();

       res.status(201).json(newActor);

    }catch(err){
        res.status(400).json({ msg: 'Can not create Actor' });
    }
}

//to update actors
export const updateActors = async(req,res) => {
    const { id } = req.params;
    const Actor = req.body;

    mongooseChecker(id, res);

    const newActor = { ...Actor , id }
    const updated = await ActorsModel.findByIdAndUpdate(id, newActor, {new: true});
   
    res.json(updated);
}

//to delete actors
export const deleteActors = async(req,res) => {
    const { id } = req.params;

    mongooseChecker(id, res);
    await ActorsModel.findByIdAndRemove(id);

    res.json({ msg: ' deleted successfully '});
}
