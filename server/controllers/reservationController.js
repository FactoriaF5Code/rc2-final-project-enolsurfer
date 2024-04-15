const Reservation = require("../models/reservation");

exports.createReservation = async (req, res) => {
  const { date, startTime, playerName } = req.body;

  if (!playerName || !date || !startTime) {
    return res
      .status(400)
      .send("Por favor, completa todos los campos antes de reservar.");
  }

  if (!date) {
    return res.status(400).json({ message: "La fecha es requerida" });
  }

  const [day, month, year] = date.split("/");
  const dateObject = new Date(Date.UTC(year, month - 1, day));

  const existingReservation = await Reservation.findOne({
    date: dateObject,
    startTime,
    playerName,
  });
  if (existingReservation) {
    return res.status(400).send("Ya has reservado para este día a esta hora");
  }

  const existingReservations = await Reservation.find({
    date: dateObject,
    startTime,
  }).countDocuments();
  if (existingReservations >= 12) {
    return res
      .status(400)
      .send("Ya no hay más huecos disponibles para esta hora");
  }

  const newReservation = new Reservation({
    date: dateObject,
    startTime,
    playerName,
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
    const formattedReservations = reservations.map((reservation) => ({
      ...reservation._doc,
      date: reservation.date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
      }),
      startTime: reservation.startTime,
    }));
    res.json(formattedReservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.find({ _id: req.params.id, playerName: req.user.name });
    if (reservation == null) {
      return res.status(404).json({ message: "Cannot find reservation" });
    }
    res.json(reservation);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
