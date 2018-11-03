const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');
const { authenticate, createToken } = require('./middlewares');

const salt = 12;

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash;

  db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id, hash });
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function login(req, res) {
  const credentials = req.body;

  db('users')
    .where({username: credentials.username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = generateToken(user);
          res.status(200).json({welcome: user.username, token });
      }
      else {
        res.status(401).json({message: 'Nope' })
      }
    })
    .catch(err => {res.status(500).json({ message: 'Ooops'})
  });
}


function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
