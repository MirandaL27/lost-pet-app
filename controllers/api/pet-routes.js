const router = require('express').Router();
//const { Pet} = require('../../models');
const sequelize = require('../../config/connection');

// get all pets
router.get('/', (req, res) => {
  });

//get one pet by id
  router.get('/:id', (req, res) => {
  });

  //create new pet
  router.post('/',(req, res) => {
  });

  //update pet
  router.put('/:id',(req, res) => {
  
  });

  module.exports = router;