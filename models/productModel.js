const { Schema, default: mongoose } = require("mongoose");



const productSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    author: String,
    barcode_number: {
        type: String,
        required: [true, "Barcode name is required !"],
        unique: [true, 'Barcode name must be unique'],
        minlength: [13, 'Short Barcode name'],
        maxlength: [13, 'Long Barcode name'],
    }, barcode_formats: {
        type: String,
        required: [true, "barcode_formats  is required !"],
    }, title: {
        type: String,
        required: [true, "title  is required !"],
    }, category: {
        type: String,
        required: [true, "category  is required !"],
    }, manufacturer: {
        type: String,
        required: [true, "manufacturer name  is required !"],
    }, brand: {
        type: String,
        required: [true, "brand name  is required !"],
    }, image: {
        type: String,
        required: [true, "image name  is required !"],
    },
}, { timestamps: true })


const setImageURL = (doc) => {
    if (doc.image) {
        const imageUrl = `${process.env.BASE_URL}/products/${doc.image}`;
        doc.image = imageUrl;
    }
};
// Get
productSchema.post('init', (doc) => {
    setImageURL(doc);
});

// Create
productSchema.post('save', (doc) => {
    setImageURL(doc);
});




const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel





