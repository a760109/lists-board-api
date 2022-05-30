const express = require('express');
const router = express.Router();
const { asyncMiddleware } = require('../../common');
const AuthService = require('../../../services/auth');
const _ = require('lodash');

router.post(
  '/auth0',
  asyncMiddleware(async function (req) {
    if (req.body && !_.isEmpty(req.body.idToken)) {
      return await AuthService.getUserDetailsByAuth0(req.body.idToken);
    }
  }),
);

module.exports = router;
