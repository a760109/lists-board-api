const express = require('express');
const router = express.Router();
const { asyncMiddleware } = require('../../common');
const UsersService = require('../../../services/users');

router.get(
  '/',
  asyncMiddleware(async function (req) {
    return await UsersService.getAll(req.account);
  }),
);

module.exports = router;
