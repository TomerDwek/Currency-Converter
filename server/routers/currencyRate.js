const express = require('express');
const mongoose = require('mongoose')
const CurrencyRate = require('../models/currencyRate');
const router = express.Router();

router.get('/', async (req, res, next) => {
    CurrencyRate.find()
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

router.get('/:currencyRateID', async (req, res, next) => {
    const id = req.params.currencyRateID;

    CurrencyRate.findById(id)
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