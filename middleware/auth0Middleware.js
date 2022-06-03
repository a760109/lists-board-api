const { createError } = require('../services/common');
const _ = require('lodash');
const jwt_decode = require('jwt-decode');

async function auth0Middleware(req, res, next) {
  const errMessage = `auth0 toekn validation error`;
  try {
    let token = req.get('AUTH0-TOKEN');
    let user = jwt_decode(token);

    if (user && !_.isEmpty(user.email)) {
      req.account = user.email;
    } else {
      next(createError(401, errMessage));
    }
  } catch (e) {
    if (e.status) {
      next(e);
    } else {
      next(createError(401, `${errMessage}: ${e.message}`));
    }
    return;
  }

  next();
}

module.exports = {
  auth0Middleware,
};
