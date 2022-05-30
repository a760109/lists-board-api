const _ = require('lodash');

function Resp(result = { timestamp: new Date().toISOString() }, status = 0, message = 'OK') {
  this.status = status;
  this.message = message;
  this.result = result;

  if (_.isEmpty(this.result)) {
    this.result = { timestamp: new Date().toISOString() };
  } else if (this.result.dataValues && !('timestamp' in this.result.dataValues)) {
    this.result.dataValues['timestamp'] = new Date().toISOString();
  } else if (!('timestamp' in this.result)) {
    this.result['timestamp'] = new Date().toISOString();
  }
}

module.exports = {
  Resp: Resp,
};
