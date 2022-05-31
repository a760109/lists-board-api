const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { auth0Middleware } = require('./middleware/auth0Middleware');

let app = express();

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: false,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, AUTH0-TOKEN',
  }),
);

// Transform buffer body to specified type
app.use(require('./middleware/contentTypeTransform').contentTypeTransformMiddleware);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

app.use('/lists/v1/auth', require('./routes/lists/v1/auth'));
app.use('/lists/v1/tasks', auth0Middleware, require('./routes/lists/v1/tasks'));

module.exports = app;
