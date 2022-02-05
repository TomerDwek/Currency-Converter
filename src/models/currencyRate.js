const mongoose = require('mongoose');

const currencyRateSchema = new mongoose.Schema({
    currencyID: {
        type: String,
        required: true
    },
    rateDate: {
        type: Date,
        default: Date.now,
    },
    rateInDollars: {
        type: Number,
        required: true
    },
    currencyRateSourceBank: {
        type: String,
        required: true
    }
});

const CurrencyRate = mongoose.model('CurrencyRate', currencyRateSchema);

module.exports = CurrencyRate;