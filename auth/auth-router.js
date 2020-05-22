const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const secrets = require("../api/secrets.js");

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body; // username, password


  const rounds = process.env.HASH_ROUNDS || 14;

   // hash the user.password
   const hash = bcrypt.hashSync(user.password, rounds);

   // update the user to use the hash
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  // search user using username
  Users.findBy({ username })
    .then(([user]) => {
      // if we find the user, then check if the password match
      if (user && bcrypt.compareSync(password, user.password)) {
        // produce a token
        const token = generateToken(user);
        // send the token to the client
        res.status(200).json({ message: "Welcome!", token })
      } else {
        res.status(401).json({ message: "You shall not pass!" })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

function generateToken(user) {
  // the data
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}


module.exports = router;
