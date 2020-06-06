const router = require('express').Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('index');
});

const api = require('./api');
router.use('/api', api)

module.exports = router;