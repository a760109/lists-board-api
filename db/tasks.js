const db = require('./index');
const tbname = 'tasks';

const attributes = {
  name: db.Sequelize.STRING(320),
  account: {
    type: db.Sequelize.STRING(320),
    allowNull: false,
  },
  descriptions: db.Sequelize.TEXT,
  // 'private', 'public'
  scope: {
    type: db.Sequelize.STRING,
    defaultValue: 'private',
  },
  // List of account who can use, when scope is private
  releaseAccount: {
    type: db.Sequelize.ARRAY(db.Sequelize.STRING(320)),
    allowNull: true,
  },
  category: db.Sequelize.ARRAY(db.Sequelize.STRING(256)),
};
const options = {};

const Tasks = db.sequelize.define(tbname, attributes, options);

module.exports = Tasks;
