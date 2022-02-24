//routes/movies
import express from 'express';
import auth from '../middlewares/auth.js';
import { getMovies, createMovies, updateMovies, deleteMovies, rateMovies } from '../controllers/movies.js';

const router = express.Router();

//routes
router.get('/', getMovies);
router.post('/', auth, createMovies);
router.patch('/:id', auth,  updateMovies);
router.delete('/:id', auth, deleteMovies);
router.patch('/:id/rate', auth,  rateMovies);


export default router;
