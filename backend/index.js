const express=require('express')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const User=require('./models/UserSchema')
const app=express()
// const {connectMongoDb}=require('./connection')
const userRouter=require('./routes/routes')
// connectMongoDb('mongodb+srv://rahul_27:rahul_270204@cluster0.yhn42dp.mongodb.net/?retryWrites=true&w=majority')
app.use(bodyParser.json())
app.use('/api',userRouter)
app.listen(8000,()=>{
    console.log('Server started on PORT 8000')
})