
const asyncHandler = require('express-async-handler');
const ProductModel = require('../models/productModel.js');
const ApiError = require('../utils/apiError.js');


//Image proccessing 
const { uploadSingleImage } = require("../utils/uploadImageMiddleware.js");
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');



// Upload single image
exports.uploadProductImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {


    const filename = `product-${uuidv4()}-${Date.now()}.jpeg`;
    if (req.file) {
        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/products/${filename}`);
        // Save image into our db
        req.body.image = filename;
    }
    next();
});


//Get banned Products form DB 
exports.getProduct = asyncHandler(async (req, res, next) => {

    const barcode = req.params.barcode;
    const product = await ProductModel.find({ barcode_number: barcode })

    if (!product) {
        return next(new ApiError(`No Product for this barcode ${barcode} in our database`, 404));
    }
    res.status(200).json({ data: product });

});

//Add banned Products to DB 
exports.addProduct = asyncHandler(async (req, res, next) => {
    const body = req.body
    const newProduct = await ProductModel.create({
        barcode_number: req.body.barcode_number,
        barcode_formats: req.body.barcode_formats,
        title: req.body.title,
        category: "Food & Beverages",
        manufacturer: req.body.manufacturer,
        brand: req.body.brand,
        image: req.body.image


    })
    res.status(201).json({ data: newProduct });

})