const express = require('express');
const mongoose = require('mongoose')
const Currency = require('../models/currency');
const router = express.Router();

router.post('/', async (req, res, next) => {
    Currency.findOne({ isoCode: req.body.isoCode })
    .exec()
        .then(doc => {
            if (doc) {
                res.status(400).json({
                    message: "Currency with this iso code is already exists."
                });
            } else {
                const currency = new Currency({
                    _id: new mongoose.Types.ObjectId(),
                    isoCode: req.body.isoCode,
                    symbol: req.body.symbol
                });
            
                currency
                    .save()
                    .then(result => {
                        res.status(201).json({
                            createdCurrency: currency
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

})

router.get('/', async (req, res, next) => {
    Currency.find()
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

router.get('/:isoCode', async (req, res, next) => {
    const isoCode = req.params.isoCode;

    Currency.findOne({ isoCode: isoCode })
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