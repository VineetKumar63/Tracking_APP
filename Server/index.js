require('dotenv').config()

const express = require('express');
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const {User} = require ("./Router/userRouter.js")
app.use("/api/user/", User)

app.listen(process.env.PORT, ()=>{
    console.log(`server is running ..........`)
});