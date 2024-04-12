// config/server.js
const express = require('express');
const mongoose = require('mongoose');
const reservationRoutes = require('../routes/reservationRoutes');

const app = express();

// Middleware
app.use(express.json());

// Conexión a la base de datos
mongoose.connect('mongodb+srv://Cluster40156:padellena@cluster40156.aiywbem.mongodb.net/reservation', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conexión a MongoDB exitosa'))
.catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/reservations', reservationRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
