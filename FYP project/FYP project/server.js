import dotenv from 'dotenv';
dotenv.config();

import mongo from 'mongoose';
import express from 'express';
const app = express();

//accepting JSON packets as requests
app.use(express.json())

//DB connection establishment
mongo.connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to the database successfully"))
  .catch((error) => console.error("Database connection error:", error));

import loginRoute from './routes/login.js';
import mapMeasureRoute from './routes/mapping.js';
import partitionRoute from './routes/partition.js';
app.use('/auth',loginRoute)
app.use('/mapping',mapMeasureRoute)
app.use('/partition',partitionRoute)

app.listen(3000,()=>{
    console.log("Connected with port : 3000")
})

