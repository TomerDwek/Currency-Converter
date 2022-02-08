const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    baseCurrency: {
        type: String,
        required: true
    },
    currencySymbol: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        default: Date.now,
    }
});

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;