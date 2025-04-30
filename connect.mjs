import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

const client = new MongoClient(process.env.MONGO)
client.connect()
console.log(client.db('shoploom'))

export default await client
