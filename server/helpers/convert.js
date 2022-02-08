const mongoose = require('mongoose');

const CurrencyRate = require('../models/currencyRate');
const Bank = require('../models/bank');

const convert = async (baseCurrency, quoteCurrency) => {
    // Check If there is direct convertion
    const baseCurrencyBank = await Bank.findOne({ baseCurrency: baseCurrency });
    const directConvertion = await CurrencyRate.findOne({ sourceBankID: baseCurrencyBank._id, currencyISOCode: quoteCurrency })
    if (directConvertion) {
        return directConvertion.rate
    }

    // If there is no direct convertion, convert by USD rate
    const USABank = await Bank.findOne({ baseCurrency: "USD" });

    const USDtoBaseCurrency = await CurrencyRate.findOne({ currencyISOCode: baseCurrency, sourceBankID: USABank._id });
    const USDtoQuoteCurrency = await CurrencyRate.findOne({ currencyISOCode: quoteCurrency, sourceBankID: USABank._id });

    const convertion = (1 / USDtoBaseCurrency.rate) * USDtoQuoteCurrency.rate;

    return Number(convertion).toFixed(8);
}

module.exports = convert;