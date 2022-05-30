const db = require('./index');
const tbname = 'users';

const attributes = {
  // Auth0 email
  account: {
    type: db.Sequelize.STRING(320),
    primaryKey: true,
  },
  // Display Name
  name: db.Sequelize.STRING(320),
  lastLoginAt: {
    // Timestamp of when last successful login
    type: db.Sequelize.DATE,
  },
  lastLoginFrom: {
    // Remote IP of where last successful login from
    type: db.Sequelize.STRING(128),
  },
  // Auth0 sub
  sub: db.Sequelize.STRING(256),
  // Login times
  times: {
    type: db.Sequelize.INTEGER,
    defaultValue: 1,
  },
};
const options = {};

const Users = db.sequelize.define(tbname, attributes, options);

module.exports = Users;
