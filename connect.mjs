import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

const client = new MongoClient("mongodb+srv://proplayerhacker20:Mineproness2023@cluster0.x4dcstd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")


export default await client.connect()
