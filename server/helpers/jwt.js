const expressJwt = require('express-jwt');
const config = require('../../configs/config.json');
const personService = require('../services/person');

module.exports = jwt;

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't need authentication
      '/api/v1/person/authenticate',
      '/api/v1/person/register',
      '/home',
    ]
  });
}

async function isRevoked(req, payload, done) {
  const person = await personService.getById(payload.sub);

  // revoke token if user no longer exists
  if(!person) {
    return done(null, true);
  }
  done();
};
