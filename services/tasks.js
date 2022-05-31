const TasksRepo = require('../db/tasks');
const JobsRepo = require('../db/jobs');
const db = require('../db/');
const _ = require('lodash');

async function getData(account) {
  const sql = `
  SELECT *
  FROM "tasks"
  WHERE "account" = :account OR "scope" = 'public' OR :account = ANY("releaseAccount")
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
      id: taskId,
    },
  });

  return {
    tasks: {
      rows: tasksRows,
      count: tasksRows.length,
    },
    jobs,
  };
}

async function createTask(account, task) {
  await TasksRepo.create({ ...task, account });

  return await getData(account);
}

async function createJob(account, job) {
  await JobsRepo.create({ ...job, account });

  return await getData(account);
}

module.exports = {
  getData,
  createTask,
  createJob,
};
