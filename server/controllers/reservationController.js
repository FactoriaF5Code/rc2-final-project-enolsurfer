// controllers/reservationController.js
const Reservation = require('../models/reservation');

exports.checkAvailability = async (req, res) => {
    // Implementa la lógica para verificar la disponibilidad de fechas y horas
};

exports.createReservation = async (req, res) => {
    const { date, startTime, playerName } = req.body;
    
    // Convertir la cadena de texto de startTime a un objeto Date
    const startTimeDate = new Date(date + 'T' + startTime);

    const newReservation = new Reservation({
        date: new Date(date),
        startTime: startTimeDate,
        playerName
    });

    try {
        const savedReservation = await newReservation.save();
        res.json(savedReservation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.cancelReservation = async (req, res) => {
    // Implementa la lógica para cancelar una reserva
};
