require("dotenv").config();
const express = require ("express");
const app = express();
const cors = require("cors");
require("./database/connect");
const router = require('./Routes/router')

/////////middelware/

app.use(express.json());
app.use(cors())
app.use(router);


app.listen(process.env.PORT,()=>{
    console.log("server is running.......")
})