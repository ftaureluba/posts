import { MongoClient } from "mongodb";

const mongoDBURL = process.env.MONGODB_URL;
const options = {}
let mongoClient;
export async function mongoHandler(request, response) {
  try{
    if (mongoClient){
      return {mongoClient}
    }
    mongoClient = await (new MongoClient(mongoDBURL, options)).connect();
    console.log('conectado al mongo')
    return {mongoClient}
  }catch(e) {return e}
}
