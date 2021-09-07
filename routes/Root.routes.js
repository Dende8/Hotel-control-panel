const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    const msg = "Bienvenidos al Panel de control del Hotel";

    return res.status(200).render('index', { title: 'Panel de Control', h1: msg });
});

module.exports = router;