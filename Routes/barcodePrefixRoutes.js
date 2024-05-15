const express = require('express');
const router = express.Router();


const { getPrefix } = require('../services/barcodePrefixServices');
const { route } = require('./productRoute');


router.route("/")
    .get(getPrefix)

router
    .route('/:prefix')


module.exports = router;
