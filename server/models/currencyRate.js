const mongoose = require('mongoose');

const currencyRateSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    currencyISOCode: {
        type: String,
        required: true
    },
    rateDate: {
        type: Number,
        default: Date.now,
    },
    rate: {
        type: Number,
        required: true
    },
    sourceBankID: {
        type: String,
        required: true
    }
});

const CurrencyRate = mongoose.model('CurrencyRate', currencyRateSchema);

module.exports = CurrencyRate;