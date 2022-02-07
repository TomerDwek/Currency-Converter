const mongoose = require('mongoose');

const CurrencyRate = require('../models/currencyRate');
const Bank = require('../models/bank');

const convert = async (baseCurrency, quoteCurrency) => {
    const USABank = await Bank.findOne({ baseCurrency: "USD" });

    const USDtoBaseCurrency = await CurrencyRate.findOne({ currencyISOCode: baseCurrency, sourceBankID: USABank._id });
    const USDtoQuoteCurrency = await CurrencyRate.findOne({ currencyISOCode: quoteCurrency, sourceBankID: USABank._id });

    const convertion = (1 / USDtoBaseCurrency.rate) * USDtoQuoteCurrency.rate;

    return convertion;
}

module.exports = convert;