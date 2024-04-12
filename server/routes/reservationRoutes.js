// routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/availability', reservationController.checkAvailability);
router.post('/reservation', reservationController.createReservation);
router.delete('/reservation/:id', reservationController.cancelReservation);

module.exports = router;
