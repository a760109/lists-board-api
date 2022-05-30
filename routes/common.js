const Model = require('../model/model.js');

function asyncMiddleware(fn) {
  return async function (req, res, next) {
    try {
      let returnVal = await fn(req, res);
      res.json(new Model.Resp(returnVal));
    } catch (e) {
      next(e);
    }
  };
}

module.exports = {
  asyncMiddleware,
};
