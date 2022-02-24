import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();
const app = express();


//imports
import moviesRoutes from './routes/movies.js';
import actorsRoutes from './routes/actors.js';
import usersRoutes from './routes/users.js';


//middlewares
app.use(express.json({limit: '50mb'}));
app.use(cors());

//routes
app.use('/', moviesRoutes);
app.use('/actors&prod', actorsRoutes);
app.use('/auth', usersRoutes);

//database const
const CONN_URL = process.env.CONN;
const PORT = process.env.PORT || 5000;

//server connection
mongoose.connect(CONN_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((err)=>console.log(err.message))
