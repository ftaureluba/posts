// api.js
//require('dotenv').config({path: './.env'});
import axios from 'axios';
const apiURL = 'http://localhost:8082'
const Api = () => {
    return axios.create({
        baseURL: apiURL
    });
};

export default Api;
