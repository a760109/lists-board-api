const db = require('./index');
const tbname = 'jobs';

const attributes = {
  taskId: db.Sequelize.INTEGER,
  name: db.Sequelize.STRING(320),
  account: {
    type: db.Sequelize.STRING(320),
    allowNull: false,
  },
  descriptions: db.Sequelize.TEXT,
  price: {
    type: db.Sequelize.DECIMAL(),
    allowNull: false,
    defaultValue: 0,
  },
  cost: {
    type: db.Sequelize.DECIMAL(),
    allowNull: false,
    defaultValue: 0,
  },
  // 'pending', 'done'
  status: {
    type: db.Sequelize.STRING,
    defaultValue: 'pending',
  },
};
const options = {};

const Tasks = db.sequelize.define(tbname, attributes, options);

module.exports = Tasks;
