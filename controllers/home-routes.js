const router = require('express').Router();
const sequelize = require('../config/connection');
const { Pet, User, Comment } = require('../models');

//render homepage (all pets from all users)
router.get('/', (req, res) => {

  Pet.findAll({
    attributes: [
      'id',
      'name',
      'pet_url',
      'specie',
      'pet_id_number',
      'color',
      'gender',
      'diet',
      'reported_location',
      'petstatus',
      'created_at',
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
        attributes: ['username']
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
        'specie',
        'pet_id_number',
        'color',
        'gender',
        'diet',
        'reported_location',
        'petstatus',
        'created_at',
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
          attributes: ['username']
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

  //render login page
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});



module.exports = router;