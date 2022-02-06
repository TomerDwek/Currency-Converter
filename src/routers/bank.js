const express = require('express');
const mongoose = require('mongoose')
const Bank = require('../models/bank');
const Currency = require('../models/currency');
const CurrencyRate = require('../models/currencyRate');

const router = express.Router();

const createCurrencyRates = (res, bankID, rates) => {
    for (const [currency, rate] of Object.entries(rates)) {
        Currency.findOne({ isoCode: currency })
        .exec()
        .then(doc => {
            if (doc) {
                const currencyRate = new CurrencyRate({
                    _id: new mongoose.Types.ObjectId(),
                    currencyISOCode: currency,
                    rateDate: Date.now(),
                    rate: rate,
                    sourceBankID: bankID
                });
            
                currencyRate.save()
                    .then(result => {
                        console.log("CurrencyRate created successfully!")
                    })
                    .catch(err => {
                        console.log(err)
                    })                
            } else {
                console.log('Invalid Currency')
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    }
}

router.post('/', async (req, res, next) => {
    const currencyCode = req.body.baseCurrency; 
    Currency.findOne({ isoCode: currencyCode })
        .exec()
        .then(doc => {
            if (doc) {
                const bank = new Bank({
                    _id: new mongoose.Types.ObjectId(),
                    baseCurrency: doc.isoCode,
                    currencySymbol: doc.symbol,
                    timestamp: Date.now(),
                });
            
                bank.save()
                    .then(async result => {
                        await createCurrencyRates(res, bank._id, req.body.rates);
                        res.status(201).json({
                            createdBank: bank
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })                
            } else {
                res.status(404)
                .json({ message: "There is no currency with this ISO code" });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})

router.get('/', async (req, res, next) => {
    Bank.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
})

router.get('/:bankID', async (req, res, next) => {
    const id = req.params.bankID;

    Bank.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404)
                .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;