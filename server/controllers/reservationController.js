const Reservation = require('../models/reservation');

exports.createReservation = async (req, res) => {
    const { date, startTime, playerName } = req.body;
    
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

exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (reservation == null) {
            return res.status(404).json({ message: 'Cannot find reservation' });
        }
        res.json(reservation);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



