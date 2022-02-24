import axios from 'axios';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000/auth' });

const headers = { 
    headers:{
        'Content-Type': 'application/json'
    }
}

API.interceptors.request.use((req) => {
    if(window.localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${ JSON.parse(window.localStorage.getItem('profile')).token }`;
    }

    return req;
});

export const Login = (logUsr) => API.post('/', logUsr, headers);
export const Signup = (newUsr) => API.post('/sgup', newUsr, headers);
