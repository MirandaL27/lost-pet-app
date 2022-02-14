const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'Boby',
    email: 'boby@b.com',
    password: 'password123'
  },
  {
    username: 'Tom',
    email: 'tom@b.com',
    password: 'password123'
  },
  {
    username: 'honey',
    email: 'honey@b.com',
    password: 'password123'
  },
  {
    username: 'Tony',
    email: 'tony@b.com',
    password: 'password123'
  },

];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
