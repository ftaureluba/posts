import Api from "./Api"

console.log(Api())
let apiService = {
    fetchData(endpoint){
        return Api().get(endpoint)
    },
    PostData(endpoint, data, headers){
        headers = headers || {};
        return Api().post(endpoint, data, {headers})
    }
}
export {apiService}