const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {
  Comment.findAll()
  .then(data => {
      res.json(data);
  })
});

router.post('/', async(req, res) => {
  try{
    if(req.session){
      let data = await Comment.create({
        comment_text: req.body.comment_text,
        pet_id: req.body.pet_id,
        user_id: req.session.user_id
      });
      data = res.json(data);
    }
  }
  catch(error){
    console.log(err);
    res.status(400).json(err);
  }
});



// router.post('/', withAuth, (req, res) => {
//   // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
//   Comment.create({
//     comment_text: req.body.comment_text,
//     user_id: req.session.user_id,
//     post_id: req.body.post_id
//   })
//     .then(dbCommentData => res.json(dbCommentData))
//     .catch(err => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });

module.exports = router;