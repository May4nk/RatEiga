//reducers/index
import { combineReducers } from 'redux';

//reducers
import moviesReducer  from './movies';
import actorsReducer  from './actors';
import authReducer  from './auth';

export default combineReducers({ moviesReducer, actorsReducer, authReducer });
