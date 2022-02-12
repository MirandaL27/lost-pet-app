const router = require('express').Router();
const sequelize = require('../config/connection');
const multer  = require('multer')

//----------------upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });


//render upload images page
router.get('/', (req, res) => {
  if(req.session.logginIn){
    res.redirect('/');
    return;
  }
  //ToDO: add code that will return the image.
  res.render('petImage');
});

router.post('/',upload.single('img-post'),(req, res) => {
  //post the image here!
  //console.log(req.file);
  // var response = '<a href="/">Home</a><br>'
  // response += "Files uploaded successfully.<br>"
  // response += `<img src="${req.file.path}" /><br>`
  // return res.send(response)
});

module.exports = router;