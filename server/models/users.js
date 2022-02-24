//model/users
import mongoose from 'mongoose';

//user schema
const usersSchema = mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
})

const UserModel = mongoose.model('users', usersSchema);

export default UserModel;
