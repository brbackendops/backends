const express = require('express');
const logger = require('morgan');

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.use(logger())

// error middleware
const errorMiddleware = require('./middlewares/error.middleware');

// routes
const userRoute = require('./routes/user.route');
const contactRoute = require('./routes/contact.route');
app.use('/user',userRoute);
app.use('/contacts',contactRoute);

app.get('/',(req,res) => {
    return res.json({
        "message": "welcome to contact management api"
    })
})
app.use(errorMiddleware);


const port = 3000;
app.listen(port , () => {
    console.log(`server is running on 127.0.0.1:${port}`)
})
