const mongoose = require('mongoose');

const CurrencyRate = require('../models/currencyRate');
const Bank = require('../models/bank');

const convert = async (baseCurrency, quoteCurrency) => {
    // Check If there is direct conversion
    const baseCurrencyBank = await Bank.findOne({ baseCurrency: baseCurrency });
    const directConversion = await CurrencyRate.findOne({ sourceBankID: baseCurrencyBank._id, currencyISOCode: quoteCurrency })
    if (directConversion) {
        return directConversion.rate
    }

    // If there is no direct conversion, convert by USD rate
    const USABank = await Bank.findOne({ baseCurrency: "USD" });

    const USDtoBaseCurrency = await CurrencyRate.findOne({ currencyISOCode: baseCurrency, sourceBankID: USABank._id });
    const USDtoQuoteCurrency = await CurrencyRate.findOne({ currencyISOCode: quoteCurrency, sourceBankID: USABank._id });

    const conversion = (1 / USDtoBaseCurrency.rate) * USDtoQuoteCurrency.rate;

    return Number(conversion).toFixed(8);
}

module.exports = convert;