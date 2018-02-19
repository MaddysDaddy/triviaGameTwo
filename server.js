const express = require('express');
const parser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000;

const app = express();

// serve via angular
app.use(express.static(path.resolve('dist')));

//setup body parser
app.use(parser.urlencoded({
  extended: true
}));

//json parser
app.use(parser.json());

// Session configuration
const sessionConfig = {
  saveUninitialized: true,
  secret: 'sessionSecret',
  resave: false,
  name: 'session',
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 360000
  }
};

app.use(cookieParser('ltakjejaiowjefoijwoiejfoiwjeofijsjijwef'));
app.use(session(sessionConfig));

// connect to mongodb
require('./server/config/mongoose');

// get routes
app.use('/auth/users', require('./server/config/auth-routes'));
app.use('/api', require('./server/config/routes'));

// Catch all
app.use(require('./server/config/catch-all'));

//setup localhost
app.listen(port, () => console.log(`Listening on port: ${port}`));
