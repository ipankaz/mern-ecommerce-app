const express = require('express')
const env = require('dotenv')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const authRoutes  = require('./routes/auth')
const adminRoutes  = require('./routes/admin/auth')


const app = express();


//enviornment variable or you can say constants
env.config()

// mongodb connection
// mongodb+srv://root:<password>@cluster0.biahp.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.biahp.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
     useNewUrlParser: true, 
     useUnifiedTopology: true,
     useCreateIndex:true
    }).then(()=>{
        console.log("Database connected");
    })

app.use(bodyparser())
app.use('/api',authRoutes)
app.use('/api',adminRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`server started on https://localhost:${process.env.PORT}`);
})