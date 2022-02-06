const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    isoCode: {
        type: String,
        required: true,
        unique: true
    },
    symbol: {
        type: String,
        required: true,
    }
});

const Currency = mongoose.model('Currency', currencySchema);

module.exports = Currency;