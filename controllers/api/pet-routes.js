const router = require('express').Router();
const { Pet, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');

// get all pets
router.get('/', (req, res) => {
    Pet.findAll({
      // attributes: [
      //   'id',
      //   'post_url',
      //   'title',
      //   'created_at',
      // ],
      order: [['created_at', 'DESC']], 
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//get one pet by id
  router.get('/:id', (req, res) => {
    Pet.findOne({
      where: {
        id: req.params.id
      },
      // attributes: [
      //   'id',
      //   'post_url',
      //   'title',
      //   'created_at',
      // ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //create new pet
  router.post('/',(req, res) => {
    Pet.create({
      // title: req.body.title,
      // post_url: req.body.post_url,
      // user_id: req.body.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //update pet
  router.put('/:id',(req, res) => {
    Pet.update(
      {
        //title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;