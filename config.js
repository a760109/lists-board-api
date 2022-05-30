var nconf = require('nconf');

nconf.use('memory');

// Command-line arguments
nconf.argv();

// Environment variables
nconf.env();

nconf.defaults({
  AUTH0_DOMAIN: 'a760109.us.auth0.com',
  LISTS_DB_TYPE: 'postgres',
  LISTS_DB_HOSTNAME: 'localhost',
  LISTS_DB_NAME: 'lists',
  LISTS_DB_USERNAME: 'idtech',
  LISTS_DB_PASSWORD: '1qaz@WSX',
  LISTS_DB_ALTER: true,
});

let conf = nconf.get();

conf._parse = function () {
  if (conf['LISTS_DB_ALTER']) {
    if (typeof conf['LISTS_DB_ALTER'] === 'string') {
      let v = conf['LISTS_DB_ALTER'].toLowerCase();
      if (v === 'true' || v === '1') {
        conf['LISTS_DB_ALTER'] = true;
      } else {
        conf['LISTS_DB_ALTER'] = false;
      }
    }
  }
};

conf._parse();

module.exports = conf;
