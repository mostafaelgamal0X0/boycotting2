const ProductRoute = require("./Routes/productRoute")
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });
const express = require('express');
const ApiError = require("./utils/apiError");
const path = require('path');
const dbConnection = require("./utils/database");
const cors = require('cors');
const compression = require('compression');
const globalError = require('./utils/errorMiddleware');
const companiesListRoute = require("./Routes/companiesListRoute")
const barcodePrefixRoute = require("./Routes/barcodePrefixRoutes")


// Connect with db
dbConnection();


const app = express()


// Enable other domains to access your application
app.use(cors());
app.options('*', cors());


// compress all responses
app.use(compression());


// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));


// Mount Routes
app.use('/api/boycotting/products', ProductRoute)
app.use('/api/boycotting/companies', companiesListRoute)
app.use('/api/boycotting/prefix', barcodePrefixRoute)


app.all('*', (req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error(`Shutting down....`);
        process.exit(1);
    });
});
