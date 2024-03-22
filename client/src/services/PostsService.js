import Api from "./Api"

console.log(Api())
let apiService = {
    fetchData(endpoint){
        return Api().get(endpoint)
    },
    PostData(endpoint, data){
        return Api().post(endpoint, data)
    }
}
export {apiService}