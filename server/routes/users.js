//routes/users
import express from 'express';
import { login, signup } from '../controllers/users.js';

const router = express.Router();

//routes
router.post('/', login);
router.post('/sgup', signup);

export default router;
