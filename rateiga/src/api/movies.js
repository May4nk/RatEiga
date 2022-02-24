//api/movies.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000' });

API.interceptors.request.use((req) => {
    if(window.localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${ JSON.parse(window.localStorage.getItem('profile')).token }`;
    }

    return req;
});

const headers = { 
    headers:{
        'Content-Type': 'application/json'
    }
}

//request GET, POST, PATCH, DELETE to movies model
export const fetchPosters = () => API.get('/');

export const createPosters = (Poster) =>  API.post('/', Poster, headers);

export const updatePosters = (id, newPoster) => API.patch(`/${id}`, newPoster, headers);

export const deletePosters = (id) => API.delete(`/${id}`);

export const likePosters = (id, beta) => API.patch(`/${id}/rate`, beta, headers);

