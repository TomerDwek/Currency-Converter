const express = require('express');
const convert = require('../service/convert');
const router = express.Router();

router.get('/:baseCurrency/:quoteCurrency', async (req, res, next) => {
    const result = await convert(req.params.baseCurrency, req.params.quoteCurrency);
    res.status(200).json({
        message: "Conversion Rate:",
        rate: result
    });
});

module.exports = router;