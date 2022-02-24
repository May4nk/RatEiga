//model/actors
import mongoose from 'mongoose';

//actors schema
const actorsSchema = mongoose.Schema({
        aname: { type: String, required: true },
        gender: { type: String },
        dob: { type: Date },
        bio: { type: String },
        type: { type: String, default: 'actor' },
        pic: { type: String }
})

const ActorsModel = mongoose.model( 'actors', actorsSchema );

export default ActorsModel;
