const Reservation = require('./reservation'); // Asegúrate de que la ruta sea correcta

const createReservation = async (req, res) => {
    // Crear una nueva reserva con los datos del cuerpo de la solicitud
    const newReservation = new Reservation({
        date: req.body.date,
        startTime: req.body.startTime,
        playerName: req.body.playerName
    });

    try {
        // Intentar guardar la nueva reserva en la base de datos
        const savedReservation = await newReservation.save();

        // Enviar una respuesta con la reserva guardada
        res.json(savedReservation);
    } catch (error) {
        // Si algo sale mal, enviar una respuesta con el error
        res.status(500).json({ error: error.toString() });
    }
};

module.exports = createReservation;