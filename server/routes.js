const express = require('express');
const routes = express();

const currencyRoutes = require('./routers/currency');
const bankRoutes = require('./routers/bank');
const currencyRateRoutes = require('./routers/currencyRate');
const conversionRouter = require('./routers/convert');

routes.use(express.json());

routes.use("/currencies", currencyRoutes);
routes.use("/banks", bankRoutes);
routes.use("/currencyrate", currencyRateRoutes);
routes.use("/convert", conversionRouter)

module.exports = routes;