const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');
const Users = require('../users/users-model');

// AUTHENTICATION
const restricted = (req, res, next) => {
  const token = req.headers.authorization
  if(!token) {
    next({ status: 401, message: 'access denied' });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if(err) {
        next({ status: 401, message: 'access denied' });
      } else {
        req.decodedJwt = decodedToken;
        next()
      }
    })
  }
}

function validateUser(req, res, next) {
  if(!req.body.username || typeof req.body.username != 'string' || !req.body.username.trim()) {
      next({ status: 400, message: 'username is required and must be a string' });
  } else if(!req.body.password || typeof req.body.password != 'string' || !req.body.password.trim()) {
      next({ status: 400, message: 'password is required and must be a string' });
  } else {
      req.user = {
          username: req.body.username.trim(),
          password: req.body.password.trim(),
      };
      next();
  }
}
function usernameIsUnique(req, res, next) {
  if(Users.findBy({ username: req.user.username }).first() != null) {
      next({ status: 400, message: `user '${req.user.username}' already exists!` });
  } else {
      next();
  }
}

 function usernameExists(req, res, next) {
  const user =  Users.findBy({ username: req.user.username }).first();
  if(user == null) {
      next({ status: 400, message: `user '${req.user.username}' does not exist!` });
  } else {
      req.user = user;
      next();
  }
}

// AUTHORIZATION
// const only = role => (req, res, next) => {
//   if (role != req.decodedJwt.role) {
//     next({ status: 401, message: 'access denied' });
//   } else {
//     next()
//   }
//}

module.exports = {
  restricted,
  usernameExists,
  usernameIsUnique,
  validateUser
  // only,
}
