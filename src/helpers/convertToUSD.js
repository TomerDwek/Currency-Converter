const mongoose = require('mongoose');

const Currency = require('../models/currency');
const Bank = require('../models/bank')
const CurrencyRate = require('../models/currencyRate')

const BASE_CURRENCY = "USD"

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

const convertToUSD = async () => {
    const USABank = await Bank.findOne({ baseCurrency: BASE_CURRENCY });

    // 1 USD = 1 USD convertion
    if(!await CurrencyRate.findOne({ currencyISOCode: BASE_CURRENCY, sourceBankID: USABank._id })) {
        await createRateToUSD(USABank._id, BASE_CURRENCY, 1);
    }


    let convertedCurrencies = [];
    for (const convertedCurrency of await CurrencyRate.find({ sourceBankID: USABank._id })) {
        convertedCurrencies.push(convertedCurrency.currencyISOCode);
    }

    // Convert all currencies to USD value
    for (const bank of await Bank.find({ baseCurrency: { $nin: convertedCurrencies }})) {
        const bankRates = await CurrencyRate.find({ sourceBankID: bank._id });
        let minRate = Infinity;

        for (let rate of bankRates) {
            if (convertedCurrencies.includes(rate.currencyISOCode)) {
                const usdRate = await CurrencyRate.findOne({ currencyISOCode: rate.currencyISOCode, sourceBankID: USABank._id });
                
                const currentRate = (1 / rate.rate) * usdRate.rate
                minRate = Math.min(minRate, currentRate)
            }
        }

        await createRateToUSD(USABank._id, bank.baseCurrency, minRate);        
    }

    console.log(await CurrencyRate.find({ sourceBankID: USABank._id }))
}

module.exports = convertToUSD;