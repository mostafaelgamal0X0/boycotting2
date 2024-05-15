
const asyncHandler = require('express-async-handler');
const BarcodePrefixModel = require('../models/barcodePrefixModel');
const List = ["United States", "Canada", "France and Monaco"
]

exports.getPrefix = asyncHandler(async (req, res, next) => {
    console.log("mm")
    console.log(req.query.prefix)
    let query = {};
    if (req.query.prefix) {
        const barcodeNum = req.query.prefix;
        query = { barcode: { $regex: barcodeNum, $options: 'i' } };
    }
    const object = await BarcodePrefixModel.findOne(query)
    res.status(200).json({ data: object.country });

});

