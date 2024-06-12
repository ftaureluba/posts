// api.js
import axios from 'axios';

const Api = () => {
    return axios.create({
        baseURL: 'https://posts-ifgsp6kg5-felitaurels-projects.vercel.app'
    });
};

export default Api;
