const router = require('express').Router();
const changeController = require('./../controllers/payment/change/index');

router.post('/payment/change', changeController.index)

module.exports = router;