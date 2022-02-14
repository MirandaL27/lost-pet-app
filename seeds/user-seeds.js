const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'Boby',
    email: 'boby@b.com',
    password: 'password123',
    contactMethod: "email"
  },
  {
    username: 'Tom',
    email: 'tom@b.com',
    password: 'password123',
    contactMethod: "email"
  },
  {
    username: 'honey',
    email: 'honey@b.com',
    password: 'password123',
    contactMethod: "email"
  },
  {
    username: 'Tony',
    email: 'tony@b.com',
    password: 'password123',
    contactMethod: "email"
  },

];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
