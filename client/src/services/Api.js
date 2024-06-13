// api.js
import axios from 'axios';
apiURL = process.env.REACT_APP_API_URL;
const Api = () => {
    return axios.create({
        baseURL: apiURL
    });
};

export default Api;
