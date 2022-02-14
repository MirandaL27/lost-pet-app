const router = require('express').Router();
const sequelize = require('../config/connection');
const { Pet, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

module.exports = router;

//get all of the pets for a specific user (get the posts that are displayed on the dashboard)
router.get('/',withAuth ,(req, res) => {
    Pet.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
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
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // serialize data before passing to template
        const pets = dbPostData.map(post => post.get({ plain: true }));
        res.render('user', { pets, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //update a single pet (for updating a pet)
  router.get("/edit/:id",withAuth ,(req, res) => {
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
            attributes: ['username']
          }
        ]
      })
      .then(dbPostData => {
        const pet = dbPostData.get({ plain: true });
        const session = {user_id: req.session.user_id, username: req.session.username};
        //console.log(pet);
        res.render('update-pet', {
         pet,
         session,   
         loggedIn: true
        });
      })
  })