const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const customer = require('./routes/customer');
const path = require('path');

// Connect db first

mongoose
    .connect(
        'mongodb://mongoSvr:27017/umbrella',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log(err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')))

// Customer router
app.use('/customers', customer);

app.get('*', (req, res) => {
    return res.sendFile('./index.html', { root: __dirname });
});
  
// ignore all
app.get('/', (req, res) => {
    res.send('You request is not supported so far, please try later.');
});

const port = 3001;
app.listen(port, () => console.log('Customer Server running...'));