const router = require('express').Router();

router.use('/weather', require('./weater'));

module.exports = router;