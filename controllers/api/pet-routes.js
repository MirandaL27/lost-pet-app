const router = require('express').Router();
const { Pet, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const fs = require('fs');
const withAuth = require("../../utils/auth");
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


  //create new pet
  router.post('/',[withAuth,upload.single('img-post')],(req, res) => {
    console.log(req.body.user_id, req.body.loggedIn, req.body.username);
    Pet.create({
      name: req.body.name,
      pet_url: "test.com",
      species: req.body.species,
      breed: req.body.breed,
      pet_id_number: (req.body.Id_number != "" ? req.body.Id_number: null),
      color: req.body.colors,
      gender: req.body.gender,
      age: (req.body.age != "" ? req.body.age : null),
      diet: req.body.diet,
      reported_location: req.body.location,
      is_lost: (req.body.status === "lost" ? true: false),
      image_path: (req.file ? req.file.path.replace("public","") : null),
      user_id: req.body.user_id
    })
      .then(data => {
        res.redirect(`/pet/${data.id}`);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


//   //delete photo route
// router.delete('/:id',withAuth,(req, res) => {
//   Pet.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: ['image_path']
//   })
//   .then(dbPetData => {
//     if (!dbPetData) {
//       res.status(404).json({ message: 'No pet found with this id' });
//       return;
//     }
//     console.log(dbPetData.image_path);
//     fs.unlink("public"+dbPetData.image_path, () => {
      
//       res.send("Photo deleted Successfully!")
    
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// })

  //update pet (need to use post route because html forms don't support put or delete)
  router.post('/:id',[withAuth,upload.single('img-post')],(req, res) => {
    console.log("Hello!  you are in the pets update route!");
    console.log(req.body.img_path);
    Pet.update(
      {
        name: req.body.name,
        pet_url: "test.com",
        species: req.body.species,
        breed: req.body.breed,
        gender: req.body.gender,
        age: (req.body.age != "" ? req.body.age : null),
        pet_id_number: (req.body.Id_number != "" ? req.body.Id_number: null),
        color: req.body.colors,
        diet: req.body.diet,
        reported_location: req.body.location,
        is_lost: (req.body.status === "lost" ? true: false),
        image_path: (req.body.img_path ? req.body.img_path : (req.file ? req.file.path.replace("public","") : null))
      },
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
        res.redirect(`/pet/${req.params.id}`);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;