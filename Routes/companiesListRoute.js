const express = require('express');
const router = express.Router();


const { addCompany, getCompanies, CheckCompany } = require("../services/companiesListServices")

router
    .route('/')
    .get(getCompanies)
    .post(addCompany)

router.route('/:company')
    .get(getCompanies)



module.exports = router;
