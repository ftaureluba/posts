// api.js
import axios from 'axios';

const Api = () => {
    return axios.create({
        baseURL: 'http://localhost:8082'
    });
};

export default Api;
