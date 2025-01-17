const express = require('express');
const router = express.Router();
const { asyncMiddleware, createError } = require('../../common');
const _ = require('lodash');
const TasksService = require('../../../services/tasks');
const { dispatchMessage } = require('../../websocket');

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

    dispatchMessage(req.get('AUTH0-TOKEN'), { event: 'updateTask', data: 0 });

    return await TasksService.createTask(req.account, req.body);
  }),
);

// update
router.put(
  '/',
  asyncMiddleware(async function (req) {
    if (!_.isNumber(req.body.id)) {
      throw createError(400, 'invalid data');
    }

    dispatchMessage(req.get('AUTH0-TOKEN'), { event: 'updateTask', data: 0 });

    return await TasksService.updateTask(req.account, req.body);
  }),
);

// delete
router.delete(
  '/:id',
  asyncMiddleware(async function (req) {
    const { id } = req.params;
    if (!id) {
      throw createError(400, 'Missing token hash');
    }

    dispatchMessage(req.get('AUTH0-TOKEN'), { event: 'updateTask', data: id });

    return await TasksService.deleteTask(req.account, id);
  }),
);

// create
router.post(
  '/job',
  asyncMiddleware(async function (req) {
    if (!_.isNumber(req.body.taskId) || _.isEmpty(req.body.name) || !_.isEmpty(req.body.id)) {
      throw createError(400, 'invalid data');
    }

    dispatchMessage(req.get('AUTH0-TOKEN'), { event: 'updateTask', data: req.body.taskId });

    return await TasksService.createJob(req.account, req.body);
  }),
);

// update
router.put(
  '/job',
  asyncMiddleware(async function (req) {
    if (!_.isNumber(req.body.taskId) || !_.isNumber(req.body.id)) {
      throw createError(400, 'invalid data');
    }

    dispatchMessage(req.get('AUTH0-TOKEN'), { event: 'updateTask', data: req.body.taskId });

    return await TasksService.updateJob(req.account, req.body);
  }),
);

// delete
router.delete(
  '/job/:id',
  asyncMiddleware(async function (req) {
    const { id } = req.params;
    if (!id) {
      throw createError(400, 'Missing token hash');
    }

    dispatchMessage(req.get('AUTH0-TOKEN'), { event: 'updateTask', data: 0 });

    return await TasksService.deleteJob(req.account, id);
  }),
);

module.exports = router;
