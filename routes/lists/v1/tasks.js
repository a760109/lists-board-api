const express = require('express');
const router = express.Router();
const { asyncMiddleware, createError } = require('../../common');
const _ = require('lodash');
const TasksService = require('../../../services/tasks');

router.get(
  '/',
  asyncMiddleware(async function (req) {
    return await TasksService.getData(req.account);
  }),
);

// create
router.post(
  '/',
  asyncMiddleware(async function (req) {
    if (_.isEmpty(req.body.name)) {
      throw createError(400, 'invalid data');
    }

    return await TasksService.createTask(req.account, req.body);
  }),
);

// update
router.put(
  '/',
  asyncMiddleware(async function (req) {
    console.log('#####put#####');
  }),
);

// create
router.post(
  '/job',
  asyncMiddleware(async function (req) {
    console.log('#####create job#####');
    if (_.isEmpty(req.body.taskId) || _.isEmpty(req.body.name)) {
      throw createError(400, 'invalid data');
    }

    return await TasksService.createJob(req.account, req.body);
  }),
);

// update
router.put(
  '/job',
  asyncMiddleware(async function (req) {
    console.log('#####put#####');
    if (_.isEmpty(req.body.taskId) || _.isEmpty(req.body.name)) {
      throw createError(400, 'invalid data');
    }
  }),
);

module.exports = router;
