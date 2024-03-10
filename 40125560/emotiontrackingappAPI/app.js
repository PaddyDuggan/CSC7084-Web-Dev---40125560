const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv').config({ path: './config.env'});
const basicRouter = require('./routes/basicroutes');
const snapshotRouter = require('./routes/snapshotroutes');
const userRouter = require('./routes/userroutes');
const session = require("express-session");

const app = express();

app.use(morgan('tiny'));

app.use(express.json());

app.use(basicRouter);
app.use(snapshotRouter);
app.use(userRouter);

app.listen(process.env.PORT, (err) => {
if(err) return console.log(err);

    console.log(`Express web server listening on port ${process.env.PORT}`);
});