const companiesListModel = require("../models/companiesListModel")

const asyncHandler = require('express-async-handler');

companiesListModel
//Get banned Products form DB 
exports.getCompanies = asyncHandler(async (req, res, next) => {
    let query = {};
    if (req.query.company) {
        const companyName = req.query.company;
        query = { company: { $regex: companyName, $options: 'i' } };
    }
    const object = await companiesListModel.findOne(query)
    if (!object) {
        res.status(200).json({ success: false });
    }
    res.status(200).json({ success: true });


});


exports.addCompany = asyncHandler(async (req, res, next) => {

    const newCompany = await companiesListModel.create({
        company: req.body.company
    })
    res.status(201).json({ data: newCompany });

})


exports.CheckCompany = asyncHandler(async (req, res, next) => {
    let query = {};
    console.log(req.params.company)
    if (req.params.company) {
        const companyName = req.params.company;
        query = { company: { $regex: companyName, $options: 'i' } };
    }

    const companies = await companiesListModel.find(query);

    res.status(200).json({ data: companies });
})