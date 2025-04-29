// All Package Imports
import express from 'express'
import cors from 'cors'
import mongodb from './connect.mjs'
import signupvalidation from './signup-validation.mjs'
import loginvalidation from './login-validation.mjs'
import fs from 'fs'
import productget from './product-get.mjs'
import dotenv from 'dotenv'
dotenv.config()
// Connect To mongo DB
const db = await mongodb.db('shoploom')
const collection = await db.collection('users')
// All Express Middleware
const app = express()
app.use(express.json({ limit: "500mb" }))
app.use(express.urlencoded({ extended: true, limit: "500mb" }))
app.use(cors())
app.use(express.static('public'))


// All Routes

app.post('/signup', async (req, res) => {
  const resport = await signupvalidation(collection, req.body, await collection.find().toArray())
  res.send(resport)
})
app.post('/login', async (req, res) => {
  const resport = await loginvalidation(await collection.find().toArray(), req.body)
  res.send(resport)
})

app.post('/product-id/*', async (req, res) => {
  const report = await productget(await db.collection('product'), req.params[0])
  res.send(report)
})

app.post('/product-get', async (req, res) => {
  const report = await productget(await db.collection('product'));
  res.send(report)
})
app.post('/upload', async (req, res) => {
  const collection = await db.collection("product");
  await collection.insertOne(req.body)
  res.status(200).send('Product Was Uploaded')

})

app.get('*', (req, res) => {
  fs.readFile('index.html', 'utf-8', (err, data) => {
    res.send(data)
  })
})
app.post('/order', async (req, res) => {
  const collection = db.collection("order")
  await collection.insertOne(req.body)
  res.send("<h1>Order Was Placed</h1>")
})

app.post('/gets', async (req, res) => {
  const collection = await db.collection('order').find().toArray()
  res.send(collection)
})
// Listion Port
app.post('/remove', async (req, res) => {
  const collection = await db.collection('product');
  await collection.deleteOne(req.body)
  res.send('Product Was Deleted')
})

app.post('/edit', async (req, res) => {
  const collection = await db.collection("product");
  await collection.updateOne(
    { id: req.body.id },
    {
      $set: {
        "title": req.body.title,
        "price": req.body.price,
        "des": req.body.des,
      }
    }
  )
  res.send('Edited')
})

app.post('/get-order', async (req, res) => {
  const collection = await db.collection('order')
  const array = await collection.find().toArray()
  const find = array.find(ids => ids.id == req.body.id)
  res.send(find)
})

app.listen(8080, () => {
  console.log(`This Backend Server Start On ${process.env.URL}`)
})