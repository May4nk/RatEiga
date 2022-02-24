//routes/Actors
import express from 'express';
import auth from '../middlewares/auth.js';
import { getActors, createActors, updateActors, deleteActors } from '../controllers/actors.js';

const router = express.Router();

//routes
router.get('/', getActors);
router.post('/', auth, createActors);
router.patch('/:id', auth, updateActors);
router.delete('/:id', auth, deleteActors);

export default router;
