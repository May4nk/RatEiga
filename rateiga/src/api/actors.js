//api/actors.js 
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/actors&prod' });

API.interceptors.request.use((req) => {
    if(window.localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${ JSON.parse(window.localStorage.getItem('profile')).token }`;
    }

    return req;
});

const header = {
    headers: {
        'Content-Type': 'application/json'
    }
}

//request GET, POST, PATCH, DELETE to actors model
export const getActors = () =>  API.get('/');

export const postActors = (actor) => API.post('/', actor, header);

export const patchActors = (id, updateActor) => API.patch(`/${id}`, updateActor, header);

export const removeActors = (id) => API.delete(`/${id}`);



