const mongoose = require('mongoose');

const Bank = require('../models/bank')
const CurrencyRate = require('../models/currencyRate')

const BASE_CURRENCY = "USD"

// Create CurrencyRate with an exchange rate in dollars
const createRateToUSD = (USABankId, currencyISOCode, rate) => {
    const rateToUSD = new CurrencyRate({
        _id: new mongoose.Types.ObjectId(),
        currencyISOCode: currencyISOCode,
        rateDate: Date.now(),
        rate: rate,
        sourceBankID: USABankId
    })

    rateToUSD.save()
        .then(result => {
            console.log("CurrencyRate created successfully!")
        })
        .catch(err => {
            console.log(err)
        })  
}

// Convert currencies that have not yet been converted to dollars
const addUsdRatesCurrencies = async (convertedCurrencies, USABankID) => {
    for (const bank of await Bank.find({ baseCurrency: { $nin: convertedCurrencies }})) {
        const bankRates = await CurrencyRate.find({ sourceBankID: bank._id });
        let minRate = Infinity;

        for (let rate of bankRates) {
            if (convertedCurrencies.includes(rate.currencyISOCode)) {
                const usdRate = await CurrencyRate.findOne({ currencyISOCode: rate.currencyISOCode, sourceBankID: USABankID });
                
                const currentRate = (1 / rate.rate) * usdRate.rate
                minRate = Math.min(minRate, currentRate)
            }
        }

        await createRateToUSD(USABankID, bank.baseCurrency, minRate);        
    }
}

// Add 1 USD = 1 USD conversion if does not exist
const convertUSDToUSD = async (USABankID) => {
    if(!await CurrencyRate.findOne({ currencyISOCode: BASE_CURRENCY, sourceBankID: USABankID })) {
        await createRateToUSD(USABankID, BASE_CURRENCY, 1);
    }
}

// Fetch the currecies that already converted to USD rate
const fetchConvertedCurrencies = async (USABankID) => {
    let convertedCurrencies = [];
    for (const convertedCurrency of await CurrencyRate.find({ sourceBankID: USABankID })) {
        convertedCurrencies.push(convertedCurrency.currencyISOCode);
    }

    return convertedCurrencies;
}

const conversionService = async () => {
    const USABank = await Bank.findOne({ baseCurrency: BASE_CURRENCY });

    await convertUSDToUSD(USABank._id);

    const convertedCurrencies = await fetchConvertedCurrencies(USABank._id);

    await addUsdRatesCurrencies(convertedCurrencies, USABank._id);
}

module.exports = conversionService;