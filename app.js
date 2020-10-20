const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

require('dotenv').config()

//import
const userRoutes = require('./routes/user')

//app
const app = express()
//middleware 
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())


//routes middleware
app.use("/api",userRoutes)


//db connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser:true}
)
.then(()=>
    console.log('DB connected')
)
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  })
  
 const port = process.env.PORT 

 app.listen(port,()=>{
     console.log(`server is running on port ${port}`)
 })

