import Api from "./Api"

console.log(Api())
let apiService = {
    fetchData(endpoint){
        return Api().get(endpoint)
    }
}
export {apiService}