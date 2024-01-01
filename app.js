require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: ['http://localhost:5173', 'http://localhost:5000', 'http://localhost:5174', ]}));

app.use('/', indexRouter);

module.exports = app;
