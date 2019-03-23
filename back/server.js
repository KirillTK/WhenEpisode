const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const mongooseConnectionString = require('./configurations/mongooseConfig');

const app = express();
const server = http.createServer(app);

mongoose.Promise = Promise;
mongoose
  .connect(mongooseConnectionString, { useNewUrlParser: true }).then(() => console.log('Mongoose up!'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./api/user')(app, passport);


server.listen(3000, () => console.log('listen 3000 port'));
