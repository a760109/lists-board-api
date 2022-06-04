const UsersRepo = require('../db/users');

async function getAll(account) {
  let data = await UsersRepo.findAll({
    raw: true,
  });

  let accounts = [];
  if (data) {
    accounts = data.reduce((accumu, obj) => {
      if (obj.account !== account) {
        accumu.push(obj.account);
      }

      return accumu;
    }, []);
  }

  return accounts;
}

module.exports = {
  getAll,
};
