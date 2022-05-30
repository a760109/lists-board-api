const config = require('../config');
const Sequelize = require('sequelize');

//database wide options
const opts = {
  host: config.LISTS_DB_HOSTNAME,
  dialect: config.LISTS_DB_TYPE,
  define: {
    freezeTableName: true,
    sync: true,
  },
  dialectOptions: {
    connectTimeout: 10000,
  },
  logging: false,
};

let db = {};

const sequelize = new Sequelize(config.LISTS_DB_NAME, config.LISTS_DB_USERNAME, config.LISTS_DB_PASSWORD, opts);
db.sequelize = sequelize;

db.alter = config.LISTS_DB_ALTER || false;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ alter: db.alter });
  })
  .then(() => {
    console.log(`Synchronize successfully, alter=${db.alter}`);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.Sequelize = Sequelize;

module.exports = db;
