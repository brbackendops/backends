const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const helmet = require('helmet');
const cors = require("cors")
require('express-async-errors');
require('dotenv').config();

const app = express();
app.use(cors())
app.use("/public",express.static(__dirname + "/public"))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet());
app.use(logger('dev'));

app.use(session({
    secret: 'for sample api',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.get('/',(req,res) => {
    res.send('welcome 🙂')
})

const userRoute = require('./routes/user.route');
const recipeRoute = require('./routes/recipe.route');
app.use('/user',userRoute);
app.use('/recipe',recipeRoute);

app.use(require('./middlewares/error'))

const { connect } = require('./connection');
const port = process.env.PORT;
app.listen(port, async () => {
    connect();
    console.log(`🚀 running on http://127.0.0.1:${port}`)
})