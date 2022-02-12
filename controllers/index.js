const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
//const uploadRoutes = require('./upload-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
//router.use('/upload', uploadRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;