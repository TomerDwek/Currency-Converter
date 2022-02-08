const express = require('express');
const app = express();
const mongoose = require('mongoose');

const environment_variables = require('./environment_variables.json');
const currencyRoutes = require('./routers/currency');
const bankRoutes = require('./routers/bank');
const currencyRateRoutes = require('./routers/currencyRate');
const convertionRouter = require('./routers/convert');
const convertToUSD = require('./helpers/convertToUSD');

mongoose.connect(
    "mongodb+srv://rewire:" +
    environment_variables.env.MONGO_ATLAS_PW  + 
    "@currency-converter.ugu30.mongodb.net/currencyConverter?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }, () => {
        convertToUSD()
    }
);

app.use(express.json());

app.use("/currencies", currencyRoutes);
app.use("/banks", bankRoutes);
app.use("/currencyrate", currencyRateRoutes);
app.use("/convert", convertionRouter)

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;