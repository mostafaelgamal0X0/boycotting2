
const asyncHandler = require('express-async-handler');
const barcodePrefixModel = require('../models/barcodePrefixModel');


exports.getPrefix = asyncHandler(async (req, res, next) => {
    let query = {};
    if (req.query.prefix) {
        const barcodeNum = req.query.prefix;
        query = { barcode: { $regex: barcodeNum, $options: 'i' } };
    }
    const object = await barcodePrefixModel.findOne(query)
    res.status(200).json({ data: object.country });

});

