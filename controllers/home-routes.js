const router = require('express').Router();
const sequelize = require('../config/connection');
//const { Pet } = require('../models');

//render homepage (all posts from all users)
router.get('/', (req, res) => {
  res.render('homepage');
});

//render single post(by id)
router.get('/post/:id', (req, res) => {
  res.render('single-pet');
});

//render login page
router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;