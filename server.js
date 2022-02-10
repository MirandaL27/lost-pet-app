const sequelize = require('./config/connection');

const SequelizeStore = require('Connect-session-sequelize')(session.Store);

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
