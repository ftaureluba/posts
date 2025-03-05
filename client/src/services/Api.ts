// api.js
//require('dotenv').config({path: './.env'});
import axios from 'axios';
const apiURL = 'https://taurel-server.vercel.app/'
const Api = () => {
    return axios.create({
        baseURL: apiURL
    });
};

export default Api;
