const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect=require('./config/db')
const app = express();

const port = process.env.PORT || 9000;


app.listen(port,()=>{

    console.log(`app is listening on ${port}`);
});





