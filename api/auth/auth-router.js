const router = require('express').Router();
const User = require('../users/users-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { validateUser, usernameIsUnique, usernameExists } = require('../middleware/restricted');

  router.post('/register', (req, res, next) => {
    let user = req.body
  
    // bcrypting the password before saving
   
    // never save the plain text password in the db
    const hash = bcrypt.hashSync(user.password)
    user.password = hash
  
    User.add(user)
      .then(saved => {
        res.status(201).json({ message: `Great to have you, ${saved.username}` })
      })
      .catch(next)

  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});



  router.post('/login',  usernameExists, (req, res, next) => {
    const password = req.body.password;
    if(bcrypt.compareSync(password, req.user.password) == true) {
        req.session.user = req.user; // note session

        if(req.user.username == 'james') {
            req.session.isAdmin = true;
        }


        res.json(`Welcome back, ${req.user.username}!`);
    } else {
        next({ status: 401, message: 'invalid credentials provided!' });
    }


  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

module.exports = router;
