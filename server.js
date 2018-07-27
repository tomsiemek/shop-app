const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const cors = require('cors');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const app = express();


app.use(bodyParser.json());

app.use(cors())
// DB config

const db = require('./config/keys').MongoDBUrl;

//connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('mongolDB is connected :O'))
    .catch(err => console.log(err));


// Use routes
app.use('/items', items);
app.use('/users', users);


module.exports = app;