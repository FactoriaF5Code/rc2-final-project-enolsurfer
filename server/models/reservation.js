const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    playerName: { type: String, required: true }
});

module.exports = mongoose.model('Reservation', reservationSchema);
