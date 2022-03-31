"use strict"
const { json } = require('express');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

// ? Middleware

app.use(express.json());

// ? Routes
app.use("/api/v1/tasks", tasks);

const port = 4001;
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch(e) {
        console.log(e);
    }
}

start()