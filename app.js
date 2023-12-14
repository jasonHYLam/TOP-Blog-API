require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const passport = require('passport');
require('./passportConfig/passport')(passport);

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
app.use(cors());

app.use('/', indexRouter);

// don't think i need passport initialize
app.use(passport.initialize());

module.exports = app;
