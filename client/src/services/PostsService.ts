/*import Api from "./Api"

console.log(Api())
let apiService = {
    fetchData(endpoint){
        return Api().get(endpoint)
    },
    PostData(endpoint, data){
        
        return Api().post(endpoint, data)
    }
}

Api().interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['auth-token'] = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
export {apiService}*/
// PostService.js
import Api from './Api';

const apiInstance = Api();

apiInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const apiService = {
    fetchData(endpoint: any) {
        return apiInstance.get(endpoint);
    },
    PostData(endpoint: any, data: any) {
        return apiInstance.post(endpoint, data);
    }
};

export { apiService };
