const { Schema, default: mongoose } = require("mongoose");



const BarcodePrefixSchema = new Schema({
    country: {
        type: String,
        required: [true, "Country is required !"]
    }, barcode: {
        type: String,
        required: [true, "Barcode  is required !"],
        unique: [true, "Barcode  must be unique"]
    }
}, { timestamps: true })




const barcodePrefixModel = mongoose.model('BarcodePrefix', BarcodePrefixSchema)

module.exports = barcodePrefixModel





