const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const user = require('./routes/user')


app.set('view engine', 'pug')
app.set('views', 'views')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))



app.use('/',user)




const url = 'mongodb+srv://rohit:CDfVWlSotSp0NDyo@cluster0.zfxaz.mongodb.net/user-management?retryWrites=true&w=majority'

mongoose.connect(url)
db = mongoose.connection
db.on('error',(error)=>{
    console.error(error)
})
db.once('open',()=>{
    console.log("database successfully connected")
})


app.listen(3000,()=>{
    console.log("server is listening on port 3000")
})