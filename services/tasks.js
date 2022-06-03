const TasksRepo = require('../db/tasks');
const JobsRepo = require('../db/jobs');
const db = require('../db/');
const _ = require('lodash');

async function getData(account) {
  const sql = `
  SELECT *
  FROM "tasks"
  WHERE "account" = :account OR "scope" = 'public' OR :account = ANY("releaseAccount")
  ORDER BY id DESC
  `;

  const tasksRows = await db.sequelize.query(sql, {
    type: db.sequelize.QueryTypes.SELECT,
    replacements: {
      account,
    },
    raw: true,
  });

  const taskId = tasksRows.reduce((accumu, obj) => {
    accumu.push(obj.id);
    return accumu;
  }, []);

  const jobs = await JobsRepo.findAndCountAll({
    where: {
      taskId: taskId,
    },
    order: [
      ['status', 'desc'],
      ['id', 'desc'],
    ],
  });

  return {
    tasks: {
      rows: tasksRows,
      count: tasksRows.length,
    },
    jobs,
  };
}

async function updateTask(account, task) {
  //TODO check right. only owner can release to another account
  await TasksRepo.update(
    {
      name: task.name,
      descriptions: task.descriptions,
      scope: task.scope,
      releaseAccount: task.releaseAccount,
    },
    { where: { id: task.id } },
  );

  return await getData(account);
}

async function createTask(account, task) {
  await TasksRepo.create({ ...task, account });

  return await getData(account);
}

async function createJob(account, job) {
  await JobsRepo.create({ ...job, account });

  return await getData(account);
}

async function updateJob(account, job) {
  //TODO check right
  await JobsRepo.update(
    {
      name: job.name,
      descriptions: job.descriptions,
      price: job.price,
      cost: job.cost,
      status: job.status,
      taskId: job.taskId,
    },
    { where: { id: job.id } },
  );

  return await getData(account);
}

module.exports = {
  getData,
  createTask,
  createJob,
  updateJob,
  updateTask,
};
