const { createError } = require('../services/common');

async function auth0Middleware(req, res, next) {
  try {
    let token = req.get('AUTH0-TOKEN');
    console.log('TODO');

    req.account = 'a760109@gmail.com';
  } catch (e) {
    const message = `auth0 toekn validation error: ${e.message}`;
    if (e.status) {
      next(e);
    } else {
      next(createError(401, message));
    }
    return;
  }

  next();
}

module.exports = {
  auth0Middleware,
};
