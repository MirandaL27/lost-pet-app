const router = require('express').Router();
const { Pet, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');

// get all pets
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
      order: [['created_at', 'DESC']], 
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
      .then(dbPetData => res.json(dbPetData))
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
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPetData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //create new pet
  router.post('/',(req, res) => {
    Pet.create({
      id: req.body.id,
      name: req.body.name,
      pet_url: req.body.pet_url,
      specie: req.body.specie,
      pet_id_number: req.body.pet_id_number,
      color: req.body.color,
      gender: req.body.gender,
      diet: req.body.diet,
      reported_location: req.body.reported_location,
      petstatus: req.body.petstatus,
    })
      .then(dbPetData => res.json(dbPetData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //update pet
  router.put('/:id',(req, res) => {
    Pet.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPetData => {
        if (!dbPetData) {
          res.status(404).json({ message: 'No pet found with this id' });
          return;
        }
        res.json(dbPetData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;