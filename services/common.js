function createError(status, message) {
  let error = Error(message);
  error.status = status;
  return error;
}

module.exports = {
  createError,
};
