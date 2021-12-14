/*
  token test middleware
 */
const jwt = require('jsonwebtoken');
const { PRIVATE_KEY, UN_CHECK_PATHS } = require('../config');

module.exports = function (req, res, next) {
  const url = req.url;

  console.log(UN_CHECK_PATHS, url)
  //if this is login request , no need to verify. also can set white list
  if (UN_CHECK_PATHS.indexOf(url) !==-1) {
    return next();
  }

  // all other request need verify
  let token = req.headers['authorization'];  // kang_token值

  // no token
  if (!token) {
    return res.status(401).json({
      status: 1,
      msg: 'You need to log in first'
    })
  }

  // default key: kang_token  --> slice token
  token = token.slice(5);

  //  verify token
  jwt.verify(token, PRIVATE_KEY, (err, data) => {
    if (err) {
      // failed to verify
      console.log('failed to verify token', err.message);

      return res.status(401).json({
        status: 2,
        msg: 'token expires'
      })
    } else {
      // verify is good and add to req
      req.user = data; // {id: 12}
 
      return next();
    }
  })

};