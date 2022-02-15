const router = require('express').Router();
const sequelize = require('../config/connection');
const { Pet, User, Comment } = require('../models');
const helpers = require("../utils/helpers")
//render homepage (all pets from all users)
router.get('/', (req, res) => {
  let whereObj = helpers.parseQueryString(req.query);
  let userWhereObj = {};
  if(req.query.username){
    userWhereObj.username = req.query.username;
  }
  Pet.findAll({
    attributes: [
      'id',
      'name',
      'pet_url',
      'species',
      'breed',
      'pet_id_number',
      'color',
      'gender',
      'age',
      'diet',
      'reported_location',
      'is_lost',
      'created_at',
      'image_path'
    ],
    order: [['created_at', 'DESC']],
    where: whereObj,
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'pet_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username'],
        where:userWhereObj
      }
    ]
  })
    .then(dbPetData => {
      // pass a single post object into the homepage template
      const pets = dbPetData.map(pet => pet.get({ plain: true }));

      res.render('homepage', {
        pets,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  //render single pet(by id)
  router.get('/pet/:id', (req, res) => {
    Pet.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'name',
        'pet_url',
        'species',
        'breed',
        'pet_id_number',
        'color',
        'gender',
        'age',
        'diet',
        'reported_location',
        'is_lost',
        'created_at',
        'image_path'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'pet_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username', 'email', 'contactMethod']
        }
      ]
    })
      .then(dbPetData => {
        if (!dbPetData) {
          res.status(404).json({ message: 'No pet found with this id' });
          return;
        }
  
        // serialize the data
        const pet = dbPetData.get({ plain: true });
        console.log(pet);
        // pass data to template
        res.render('single-pet', {
          pet,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
//render add pet page
  router.get('/add/pet' , (req, res) => {
    console.log(req.session);
    if(!req.session.loggedIn){
      res.redirect('/');
      return;
    }
    const session = {loggedIn: req.session.loggedIn, user_id : req.session.user_id, username: req.session.username};
    res.render('add-pet', session);
  });


  //render login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('./login');
});


module.exports = router;