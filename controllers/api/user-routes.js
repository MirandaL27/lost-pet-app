const router = require('express').Router();
const { User, Pet, Comment} = require("../../models");

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
          attributes: ['id', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Post,
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
    console.log(err);
    res.status(500).json(err);
  }

});

//create new user
router.post('/',async (req, res) => {
  try{
    let data = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.username = data.username;
        req.session.loggedIn = true;
    
        res.json(dData);
      });
  }
  catch(error){
    console.log(err);
      res.status(500).json(err);
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

    //update a user
router.put('/:id', async (req, res) => {
  try{
    let data = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    });
    if (!data[0]) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(data);
  }
  catch(error){
    console.log(err);
      res.status(500).json(err);
  }
  });


module.exports = router;