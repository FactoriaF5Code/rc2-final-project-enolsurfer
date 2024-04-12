const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const reservationRoutes = require('../routes/reservationRoutes');
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Aquí es donde agregas cors

require('dotenv').config();

const dbUrl = process.env.DB_URL
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

// Conexión a la base de datos
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbUrl}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/reservation', reservationRoutes);

// Inicia el servidor
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});