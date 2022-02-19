const express = require('express');
const routes = require('./controllers');

const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3001;

const session = require('express-session');

const sequelize = require('./config/connection');
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

app.use(session(sess));



app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars'); 

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }, {limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.use('/uploads', express.static('uploads'));


// app.get('/upload', (req, res) => {
//   if(req.session.logginIn){
//     res.redirect('/');
//     return;
//   }
  
//   res.render('petImage');
// });

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

