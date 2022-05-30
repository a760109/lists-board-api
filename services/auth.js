const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserRepo = require('../db/user');

const client = jwksClient({
  jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`,
  timeout: 30000,
});

async function getUserDetailsByAuth0(idToken) {
  const decoded = jwt.decode(idToken, { complete: true });
  let userDetails;

  if (decoded && decoded.header && decoded.header.kid) {
    const publicKey = (await client.getSigningKey(decoded.header.kid)).getPublicKey();

    try {
      userDetails = jwt.verify(idToken, publicKey);
    } catch (err) {
      console.log(err);
    }
  }

  if (userDetails) {
    let user = await UserRepo.findOne({
      where: {
        account: userDetails.email,
      },
      raw: true,
    });

    let userData = {
      account: userDetails.email,
      lastLoginAt: new Date(),
      sub: userDetails.sub,
      times: user ? user.times + 1 : 1,
    };

    await UserRepo.upsert(userData);

    return {
      ...userData,
      exp: userDetails.exp,
    };
  }

  return;
}

module.exports = {
  getUserDetailsByAuth0,
};
