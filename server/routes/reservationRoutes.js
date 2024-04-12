// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/reservation', reservationController.createReservation);

module.exports = router;
