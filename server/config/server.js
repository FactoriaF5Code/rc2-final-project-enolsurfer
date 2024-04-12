// config/server.js
const express = require('express');
const mongoose = require('mongoose');
const reservationRoutes = require('../routes/reservationRoutes');

const app = express();

// Middleware
app.use(express.json());

const dbUrl = process.env.DB_URL
const dbUser = process.env.DB_US
const dbPassword = process.env.DB_PASSWORD


// Conexión a la base de datos
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbUrl}`, {
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
