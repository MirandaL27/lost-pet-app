
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
//const helpers = require('./utils/helpers');
const hbs = exphbs.create({ });

const app = express();
const PORT = process.env.PORT || 3001;
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })

};

//----------------upload image
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
// })
// const upload = multer({ storage: storage })


app.use(session(sess));



app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }, {limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));


//render upload images page
app.get('/upload', (req, res) => {
  if(req.session.logginIn){
    res.redirect('/');
    return;
  }
  //ToDO: add code that will return the image.
  res.render('petImage');
});

app.post('/upload',upload.single('img-post'),(req, res) => {
  //post the image here!
  console.log(req.file);
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
  return res.send(response)
});


// turn on routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

