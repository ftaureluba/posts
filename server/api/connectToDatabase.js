import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../src/.env') });

const mongoDBURL = process.env.MONGODB_URL;
console.log("MongoDB URL loaded:", mongoDBURL ? "Yes" : "No (undefined)");

const options = {};
let mongoClient;

export async function mongoHandler() {
  try {
    if (!mongoDBURL) {
      throw new Error("MongoDB URL is undefined. Check your .env file location and contents.");
    }
    
    if (mongoClient) {
      return { mongoClient };
    }
    mongoClient = await new MongoClient(mongoDBURL, options).connect();
    console.log("Connected to MongoDB");
    return { mongoClient };
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    throw e;
  }
}