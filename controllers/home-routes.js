const router = require('express').Router();
const sequelize = require('../config/connection');
//const { Pet } = require('../models');

//render homepage (all posts from all users)
router.get('/', (req, res) => {
  });

  //render single post(by id)
  router.get('/post/:id', (req, res) => {
  });

  //render login page
  router.get('/login', (req, res) => {
  });

module.exports = router;