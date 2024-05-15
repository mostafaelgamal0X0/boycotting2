const { Schema, default: mongoose } = require("mongoose");



const CompaniesListSchema = new Schema({
    company: {
        type: String,
        required: [true, "Company Name is required !"],
        unique: [true, "Company Name must be unique !"]
    }
}, { timestamps: true })




const companiesListModel = mongoose.model('CompaniesList', CompaniesListSchema)

module.exports = companiesListModel





