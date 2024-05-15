const express = require('express');
const router = express.Router();


const { addProduct, getProduct, uploadProductImage, resizeImage } = require('../services/productServices')



router
    .route('/')
    .get(getProduct)
    .post(uploadProductImage, resizeImage, addProduct)




module.exports = router;
