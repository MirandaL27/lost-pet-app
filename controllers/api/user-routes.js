const router = require('express').Router();
const { User, Pet, Comment} = require("../../models");
const withAuth = require('../../utils/auth');

//get all users
router.get('/', async (req, res) => {
  try{
    let data = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(data);
  }
  catch(error){
    console.log(err);
    res.status(500).json(err);
  }
  });

//get one user by id
router.get('/:id', async (req, res) => {
  try{
    let data = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Pet,
          attributes: ['id','name', 'pet_url','species','breed','pet_id_number','color','gender','age','diet','reported_location','created_at', 'is_lost', 'image_path']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Pet,
            attributes: ['id']
          }
        }
      ]
    });
    if(!data){
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(data);
  }
  catch(error){
    console.log(error);
    res.status(500).json(error);
  }

});

//create new user
router.post('/', async (req, res) => {
  try{
    let data = await User.create({
      username: req.body.username,
      email: req.body.email,
      contactMethod: req.body.contactMethod,
      password: req.body.password
    });
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.loggedIn = true;
    
        res.json(data);
      });
  }
  catch(error){
    console.log(error);
      res.status(500).json(error);
  }
  
  });

  //login route
router.post('/login', (req, res) => { 
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });

    // Verify user

  }); 
});

//logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

module.exports = router;