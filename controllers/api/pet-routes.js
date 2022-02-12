const router = require('express').Router();
const { Pet, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
// get all pets
router.get('/', (req, res) => {
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
        'species',
        'breed',
        'pet_id_number',
        'color',
        'gender',
        'age',
        'diet',
        'reported_location',
        'is_lost',
        'image_path',
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
  router.post('/',upload.single('img-post'),(req, res) => {
    console.log(req.session.user_id, req.session.loggedIn);
    Pet.create({
      name: req.body.name,
      pet_url: "test.com",
      species: req.body.species,
      breed: req.body.breed,
      pet_id_number: (req.body.Id_number != "" ? req.body.Id_number: null),
      color: req.body.colors,
      gender: req.body.gender,
      age: req.body.age,
      diet: req.body.diet,
      reported_location: req.body.location,
      is_lost: (req.body.status === "lost" ? true: false),
      image_path: (req.file ? "/" + req.file.path.replace("\\","/") : null),
      user_id: req.session.user_id
    })
      .then(data => {
        res.redirect('/');
      })
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