const mongoose = require('mongoose');

const bankCurrencySchema = new mongoose.Schema({
    currencyID: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    rates: {
        type: [Number],
        required: true
    }
});

const BankCurrency = mongoose.model('BankCurrency', bankCurrencySchema);

module.exports = BankCurrency;