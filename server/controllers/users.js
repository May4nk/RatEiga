//controllers/users
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/users.js';

export const signup = async (req, res) => {
    const { email, password, confirmpwd } = req.body;

    try{
        const check = await UserModel.findOne({ email });
        
        if(check) return res.status(400).json({ msg: 'User already exist!' });

        if(password !== confirmpwd) return res.status(400).json({ msg: 'Password dont match' });

        const pwd = await bcrypt.hash(password, 12);
        
        const result = await UserModel.create({ email, password: pwd });
        
        const token = jwt.sign({ email: result.email, id: result._id }, 'secret', {expiresIn: '1h' });

         res.status(201).json({ result, token });

    }catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });

        console.log(err);
    }
}

export const login = async  (req, res) => {
    const { email, password } = req.body;

    try{
        const check = await UserModel.findOne({ email });

        if(!check) return res.status(404).json({ msg: 'User don\'t exist!' });

        const pwdCheck = await bcrypt.compare(password, check.password);

        if(!pwdCheck) return res.status(400).json({ msg: 'Invalid Credentials' });

        const token = jwt.sign({ email: check.email, id: check._id }, 'secret', {expiresIn: '1h' });

        res.status(200).json({ result: check, token });

    }catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
        
        console.log(err);
    }
}
